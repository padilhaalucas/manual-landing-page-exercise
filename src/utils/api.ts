import { QuizData } from '@/types/quiz';

export async function fetchQuizData(req?: any): Promise<QuizData> {
  const baseUrl = req
    ? `${req.headers['x-forwarded-proto'] || 'http'}://${req.headers['x-forwarded-host'] || req.headers.host}`
    : process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${baseUrl}/api/quiz-data`);
  if (!res.ok) {
    throw new Error('Failed to fetch quiz data');
  }
  return res.json();
}
