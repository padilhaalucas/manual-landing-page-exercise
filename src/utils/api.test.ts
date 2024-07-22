import { fetchQuizData } from './api';
import { QuizData } from '@/types/quiz';

global.fetch = jest.fn() as jest.Mock;
let originalEnv: NodeJS.ProcessEnv;

describe('Utils/api', () => {
  beforeAll(() => {
    originalEnv = { ...process.env };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch quiz data successfully', async () => {
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

    const result = await fetchQuizData();

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/quiz-data');
    expect(result).toEqual(mockQuizData);
  });

  it('should throw an error when fetch fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(fetchQuizData()).rejects.toThrow('Failed to fetch quiz data');
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/quiz-data');
  });

  it('should use NEXT_PUBLIC_API_URL if set', async () => {
    process.env.NEXT_PUBLIC_API_URL = 'http://custom-api-url.com';

    jest.resetModules();

    const { fetchQuizData } = require('./api');

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

    const result = await fetchQuizData();

    expect(global.fetch).toHaveBeenCalledWith('http://custom-api-url.com/api/quiz-data');
    expect(result).toEqual(mockQuizData);
  });

  it('should fall back to localhost if NEXT_PUBLIC_API_URL is not set', async () => {
    delete process.env.NEXT_PUBLIC_API_URL;

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

    const result = await fetchQuizData();

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/quiz-data');
    expect(result).toEqual(mockQuizData);
  });
});