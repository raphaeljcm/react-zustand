import { describe, expect, it } from 'vitest';
import { next, play, player as reducer } from './player';

const EXAMPLE_STATE = {
  course: {
    modules: [
      {
        id: '1',
        title: 'Iniciando com React',
        lessons: [
          { id: 'Jai8w6K_GnY', title: 'CSS Modules', duration: '13:45' },
          {
            id: 'w-DW4DhDfcw',
            title: 'Estilização do Post',
            duration: '10:05',
          },
        ],
      },
      {
        id: '2',
        title: 'Estrutura da aplicação',
        lessons: [
          {
            id: 'gE48FQXRZ_o',
            title: 'Componente: Comment',
            duration: '13:45',
          },
          { id: 'Ng_Vk4tBl0g', title: 'Responsividade', duration: '10:05' },
        ],
      },
    ],
  },
  currentModuleIndex: 0,
  currentLessonIndex: 0,
};

describe('player slice', () => {
  it('should be able to play', () => {
    const state = reducer(
      EXAMPLE_STATE,
      play({ moduleIndex: 1, lessonIndex: 2 }),
    );

    expect(state.currentModuleIndex).toBe(1);
    expect(state.currentLessonIndex).toBe(2);
  });

  it('should be able to play the next video automatically', () => {
    const state = reducer(EXAMPLE_STATE, next());

    expect(state.currentModuleIndex).toBe(0);
    expect(state.currentLessonIndex).toBe(1);
  });

  it('should be able to jump to the next module automatically', () => {
    const state = reducer(
      {
        ...EXAMPLE_STATE,
        currentLessonIndex: 1,
      },
      next(),
    );

    expect(state.currentModuleIndex).toBe(1);
    expect(state.currentLessonIndex).toBe(0);
  });

  it('should not update the current module and lesson index if there is no next lesson available', () => {
    const state = reducer(
      {
        ...EXAMPLE_STATE,
        currentLessonIndex: 1,
        currentModuleIndex: 1,
      },
      next(),
    );

    expect(state.currentModuleIndex).toBe(1);
    expect(state.currentLessonIndex).toBe(1);
  });
});
