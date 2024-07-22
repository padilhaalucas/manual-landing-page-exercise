import { NextApiRequest, NextApiResponse } from 'next';
import handler from './quiz-data';
import quizData from '@/mocked-data-source/quiz.json';

describe('Quiz Data API', () => {
  let req: Partial<NextApiRequest>;
  let res: Partial<NextApiResponse>;

  beforeEach(() => {
    req = {
      method: 'GET',
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      setHeader: jest.fn(),
    };
  });

  it('returns quiz data for GET request', async () => {
    await handler(req as NextApiRequest, res as NextApiResponse);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(quizData);
  });

  it('handles errors when fetching quiz data', async () => {
    jest.spyOn(JSON, 'parse').mockImplementationOnce(() => {
      throw new Error('Parsing error');
    });

    await handler(req as NextApiRequest, res as NextApiResponse);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error fetching quiz data' });
  });

  it('returns 405 for non-GET methods', async () => {
    req.method = 'POST';

    await handler(req as NextApiRequest, res as NextApiResponse);

    expect(res.setHeader).toHaveBeenCalledWith('Allow', ['GET']);
    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ message: 'Method POST Not Allowed' });
  });
});