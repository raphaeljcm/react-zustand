import { create } from 'zustand';
import { api } from '../lib/axios';

type ModuleLessonIndex = {
  moduleIndex: number;
  lessonIndex: number;
};

type Course = {
  id: number;
  modules: Array<{
    id: number;
    title: string;
    lessons: Array<{
      id: string;
      title: string;
      duration: string;
    }>;
  }>;
};

export type PlayerState = {
  course: Course | null;
  currentModuleIndex: number;
  currentLessonIndex: number;
  isLoading: boolean;
  play: (moduleLessonIndex: ModuleLessonIndex) => void;
  next: () => void;
  load: () => Promise<void>;
};

export const useStore = create<PlayerState>((set, get) => {
  return {
    course: null,
    currentLessonIndex: 0,
    currentModuleIndex: 0,
    isLoading: false,

    load: async () => {
      set({ isLoading: true });

      const { data } = await api.get('/courses/1');
      set({
        course: data,
        isLoading: false,
      });
    },

    play: ({ moduleIndex, lessonIndex }: ModuleLessonIndex) => {
      set({
        currentLessonIndex: lessonIndex,
        currentModuleIndex: moduleIndex,
      });
    },
    next: () => {
      const { currentLessonIndex, currentModuleIndex, course } = get();
      const nextLessonIndex = currentLessonIndex + 1;
      const nextLesson =
        course?.modules[currentModuleIndex].lessons[nextLessonIndex];

      if (nextLesson) {
        set({
          currentLessonIndex: nextLessonIndex,
        });
      } else {
        const nextModuleIndex = currentModuleIndex + 1;
        const nextModule = course?.modules[nextModuleIndex];

        if (nextModule) {
          set({
            currentModuleIndex: nextModuleIndex,
            currentLessonIndex: 0,
          });
        }
      }
    },
  };
});

export const useCurrentLesson = () => {
  return useStore(state => {
    const { currentModuleIndex, currentLessonIndex } = state;

    const currentModule = state.course?.modules[currentModuleIndex];
    const currentLesson = currentModule?.lessons[currentLessonIndex];

    return { currentModule, currentLesson };
  });
};
