import { QuizData } from '@/types/quiz';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function fetchQuizData(): Promise<QuizData> {
  const res = await fetch(`${API_URL}/api/quiz-data`);
  if (!res.ok) {
    throw new Error('Failed to fetch quiz data');
  }
  return res.json();
}