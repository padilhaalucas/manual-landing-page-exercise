'use client'

import quiz from '@/components/Quiz'
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { QuizData } from '@/types/quiz'

export interface QuizContextType {
  quizData: QuizData | null;
  currentQuestion: number;
  answers: string[];
  showQuiz: boolean;
  quizCompleted: boolean;
  setCurrentQuestion: (question: number) => void;
  setAnswers: (answers: string[]) => void;
  setShowQuiz: (show: boolean) => void;
  setQuizCompleted: (completed: boolean) => void;
  isRejected: boolean;
}

export const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode; initialData: QuizData }> = ({ children, initialData }) => {
  const [quizData] = useState<QuizData>(initialData);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const isRejected = answers.some((answer, index) => {
    const question = quizData.questions[index];
    const option = question.options.find(opt => opt.value === answer);
    return option?.isRejection;
  });

  return (
    <QuizContext.Provider
      value={{
        quizData,
        currentQuestion,
        answers,
        showQuiz,
        quizCompleted,
        setCurrentQuestion,
        setAnswers,
        setShowQuiz,
        setQuizCompleted,
        isRejected
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};