import { fetchQuizData } from './api';
import { QuizData } from '@/types/quiz';

global.fetch = jest.fn() as jest.Mock;

describe('Utils/api', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch quiz data successfully on server side with https', async () => {
    const mockQuizData: QuizData = {
      questions: [
        {
          question: "Test question",
          type: "ChoiceType",
          options: [
            { display: "Option 1", value: "1", isRejection: false },
            { display: "Option 2", value: "2", isRejection: true },
          ],
        },
      ],
    };

    const req = {
      headers: {
        'x-forwarded-proto': 'https',
        'x-forwarded-host': 'test.com',
      },
    } as any;

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockQuizData,
    });

    const result = await fetchQuizData(req);

    expect(global.fetch).toHaveBeenCalledWith('https://test.com/api/quiz-data');
    expect(result).toEqual(mockQuizData);
  });

  it('should fetch quiz data successfully on client side', async () => {
    const mockQuizData: QuizData = {
      questions: [
        {
          question: "Test question",
          type: "ChoiceType",
          options: [
            { display: "Option 1", value: "1", isRejection: false },
            { display: "Option 2", value: "2", isRejection: true },
          ],
        },
      ],
    };

    process.env.NEXT_PUBLIC_API_URL = 'http://localhost:3000';

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockQuizData,
    });

    const result = await fetchQuizData();

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/quiz-data');
    expect(result).toEqual(mockQuizData);
  });

  it('should throw an error when fetch fails on server side', async () => {
    const req = {
      headers: {
        'x-forwarded-proto': 'https',
        'x-forwarded-host': 'test.com',
      },
    } as any;

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(fetchQuizData(req)).rejects.toThrow('Failed to fetch quiz data');
    expect(global.fetch).toHaveBeenCalledWith('https://test.com/api/quiz-data');
  });

  it('should throw an error when fetch fails on client side', async () => {
    process.env.NEXT_PUBLIC_API_URL = 'http://localhost:3000';

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(fetchQuizData()).rejects.toThrow('Failed to fetch quiz data');
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/quiz-data');
  });

  it('should construct the base URL correctly on server side with http', async () => {
    const req = {
      headers: {
        'x-forwarded-proto': 'http',
        'x-forwarded-host': 'test.com',
      },
    } as any;

    const mockQuizData: QuizData = {
      questions: [
        {
          question: "Test question",
          type: "ChoiceType",
          options: [
            { display: "Option 1", value: "1", isRejection: false },
            { display: "Option 2", value: "2", isRejection: true },
          ],
        },
      ],
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockQuizData,
    });

    const result = await fetchQuizData(req);

    expect(global.fetch).toHaveBeenCalledWith('http://test.com/api/quiz-data');
    expect(result).toEqual(mockQuizData);
  });

  it('should construct the base URL correctly on server side with default headers', async () => {
    const req = {
      headers: {
        host: 'test.com',
      },
    } as any;

    const mockQuizData: QuizData = {
      questions: [
        {
          question: "Test question",
          type: "ChoiceType",
          options: [
            { display: "Option 1", value: "1", isRejection: false },
            { display: "Option 2", value: "2", isRejection: true },
          ],
        },
      ],
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockQuizData,
    });

    const result = await fetchQuizData(req);

    expect(global.fetch).toHaveBeenCalledWith('http://test.com/api/quiz-data');
    expect(result).toEqual(mockQuizData);
  });

  it('should handle missing headers gracefully on server side', async () => {
    const req = {
      headers: {} as any,
    };

    const mockQuizData: QuizData = {
      questions: [
        {
          question: "Test question",
          type: "ChoiceType",
          options: [
            { display: "Option 1", value: "1", isRejection: false },
            { display: "Option 2", value: "2", isRejection: true },
          ],
        },
      ],
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockQuizData,
    });

    const result = await fetchQuizData(req);

    expect(global.fetch).toHaveBeenCalledWith('http://undefined/api/quiz-data');
    expect(result).toEqual(mockQuizData);
  });

  it('should throw an error when an invalid URL is constructed on server side', async () => {
    const req = {
      headers: {
        'x-forwarded-proto': '',
        'x-forwarded-host': '',
      },
    } as any;

    (global.fetch as jest.Mock).mockImplementationOnce(() => {
      throw new Error('Invalid URL');
    });

    await expect(fetchQuizData(req)).rejects.toThrow('Invalid URL');
  });
});
