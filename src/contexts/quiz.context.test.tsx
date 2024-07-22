import React from 'react';
import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { QuizProvider, useQuiz } from './quiz.context';
import { QuizData } from '@/types/quiz';

const mockQuizData: QuizData = {
  questions: [
    {
      question: "Test question 1",
      type: "ChoiceType",
      options: [
        { display: "Option 1", value: "1", isRejection: false },
        { display: "Option 2", value: "2", isRejection: true },
      ],
    },
  ],
};

describe('Contexts/QuizContext', () => {
  it('should provide the correct context value', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QuizProvider initialData={mockQuizData}>{children}</QuizProvider>
    );

    const { result } = renderHook(() => useQuiz(), { wrapper });

    expect(result.current.quizData).toEqual(mockQuizData);
    expect(result.current.currentQuestion).toBe(0);
    expect(result.current.answers).toEqual([]);
    expect(result.current.showQuiz).toBe(false);
    expect(result.current.quizCompleted).toBe(false);
    expect(result.current.isRejected).toBe(false);
  });

  it('should update context values correctly', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QuizProvider initialData={mockQuizData}>{children}</QuizProvider>
    );

    const { result } = renderHook(() => useQuiz(), { wrapper });

    act(() => {
      result.current.setCurrentQuestion(1);
      result.current.setAnswers(['1']);
      result.current.setShowQuiz(true);
      result.current.setQuizCompleted(true);
    });

    expect(result.current.currentQuestion).toBe(1);
    expect(result.current.answers).toEqual(['1']);
    expect(result.current.showQuiz).toBe(true);
    expect(result.current.quizCompleted).toBe(true);
  });

  it('should calculate isRejected correctly', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QuizProvider initialData={mockQuizData}>{children}</QuizProvider>
    );

    const { result } = renderHook(() => useQuiz(), { wrapper });

    act(() => {
      result.current.setAnswers(['2']); // This is a rejecting answer
    });

    expect(result.current.isRejected).toBe(true);

    act(() => {
      result.current.setAnswers(['1']); // This is not a rejecting answer
    });

    expect(result.current.isRejected).toBe(false);
  });

  it('should throw an error when useQuiz is used outside of QuizProvider', () => {
    const { result } = renderHook(() => useQuiz());
    expect(result.error).toEqual(Error('useQuiz must be used within a QuizProvider'));
  });
});