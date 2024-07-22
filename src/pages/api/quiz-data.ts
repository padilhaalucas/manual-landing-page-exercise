import { NextApiRequest, NextApiResponse } from 'next';

import quizData from '@/mocked-data-source/quiz.json';
import { QuizData } from '@/types/quiz';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<QuizData | { message: string }>
) {
  if (req.method === 'GET') {
    try {
      const parsedData = JSON.parse(JSON.stringify(quizData));
      res.status(200).json(parsedData as QuizData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching quiz data' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}