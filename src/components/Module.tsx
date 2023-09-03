import { ChevronDown } from 'lucide-react';
import { Lesson } from './Lesson';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import * as RadixCollapsable from '@radix-ui/react-collapsible';
import { useStore } from '../zustand-store';

interface ModuleProps {
  moduleIndex: number;
  title: string;
  amountOfLessons: number;
}

export function Module({ moduleIndex, title, amountOfLessons }: ModuleProps) {
  const { currentModuleIndex, currentLessonIndex, lessons, play } = useStore(
    store => {
      return {
        currentModuleIndex: store.currentModuleIndex,
        currentLessonIndex: store.currentLessonIndex,
        lessons: store.course?.modules[moduleIndex].lessons,
        play: store.play,
      };
    },
  );

  const [parent] = useAutoAnimate();

  const handleOnPlay = (lessonIndex: number) => {
    play({ moduleIndex, lessonIndex });
  };

  return (
    <RadixCollapsable.Root className="group" defaultOpen={moduleIndex === 0}>
      <RadixCollapsable.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4">
        <div className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-xs">
          {moduleIndex + 1}
        </div>

        <div className="flex flex-col gap-1 text-left">
          <strong className="text-sm">{title}</strong>
          <span className="text-xs text-zinc-400">{amountOfLessons} aulas</span>
        </div>

        <ChevronDown className="w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform" />
      </RadixCollapsable.Trigger>

      <RadixCollapsable.Content ref={parent}>
        <nav className="relative flex flex-col gap-4 p-6">
          {lessons &&
            lessons.map((lesson, lessonIndex) => {
              const isCurrentLesson =
                currentModuleIndex === moduleIndex &&
                currentLessonIndex === lessonIndex;

              return (
                <Lesson
                  key={lesson.id}
                  title={lesson.title}
                  duration={lesson.duration}
                  isCurrent={isCurrentLesson}
                  onPlay={() => handleOnPlay(lessonIndex)}
                />
              );
            })}
        </nav>
      </RadixCollapsable.Content>
    </RadixCollapsable.Root>
  );
}
