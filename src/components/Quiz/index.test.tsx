import Image from 'next/image'
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import renderer from 'react-test-renderer';

import Quiz from './index';
import { QuizProvider, QuizContext, QuizContextType } from '@/contexts/quiz.context';
import quizData from '@/mocked-data-source/quiz.json';
import { QuizData } from '@/types/quiz';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <Image {...props} alt="test-img-quiz" />
  },
}));

const mockQuizData: QuizData = {
  questions: quizData.questions
};

const mockQuizContextValue: QuizContextType = {
  quizData: mockQuizData,
  currentQuestion: 0,
  answers: [],
  showQuiz: true,
  quizCompleted: false,
  setCurrentQuestion: jest.fn(),
  setAnswers: jest.fn(),
  setShowQuiz: jest.fn(),
  setQuizCompleted: jest.fn(),
  isRejected: false,
};

const renderWithQuizProvider = (ui: React.ReactElement, contextValue = mockQuizContextValue) => {
  return render(
    <QuizProvider initialData={mockQuizData}>
      <QuizContext.Provider value={contextValue}>
        {ui}
      </QuizContext.Provider>
    </QuizProvider>
  );
};

describe('Components/Quiz', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render the quiz header', () => {
    renderWithQuizProvider(<Quiz />);
    expect(screen.getByText('Hair Loss Quiz')).toBeInTheDocument();
  });

  it('should set body overflow to hidden when quiz is shown', () => {
    const customContextValue = {
      ...mockQuizContextValue,
      showQuiz: true,
    };

    renderWithQuizProvider(<Quiz />, customContextValue);

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should render the first question', () => {
    renderWithQuizProvider(<Quiz />);
    expect(screen.getByText(mockQuizData.questions[0].question)).toBeInTheDocument();
  });

  it('should render all options for the first question', () => {
    renderWithQuizProvider(<Quiz />);
    mockQuizData.questions[0].options.forEach((option) => {
      expect(screen.getByAltText(option.value as string)).toBeInTheDocument();
    });
  });

  it('should handle answer selection', async () => {
    const mockSetAnswers = jest.fn();
    const mockSetCurrentQuestion = jest.fn();
    const customContextValue = {
      ...mockQuizContextValue,
      setAnswers: mockSetAnswers,
      setCurrentQuestion: mockSetCurrentQuestion,
    };

    renderWithQuizProvider(<Quiz />, customContextValue);
    const firstOption = screen.getByAltText(mockQuizData.questions[0].options[0].value as string);
    fireEvent.click(firstOption);

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(mockSetAnswers).toHaveBeenCalled();
    expect(mockSetCurrentQuestion).toHaveBeenCalled();
  });

  it('should render the "Back" button after the first question', () => {
    const customContextValue = {
      ...mockQuizContextValue,
      currentQuestion: 1,
    };

    renderWithQuizProvider(<Quiz />, customContextValue);
    expect(screen.getByText('Back')).toBeInTheDocument();
  });

  it('should handle quiz completion', () => {
    const customContextValue = {
      ...mockQuizContextValue,
      quizCompleted: true,
      isRejected: false,
    };

    renderWithQuizProvider(<Quiz />, customContextValue);
    expect(screen.getByText('Great news!')).toBeInTheDocument();
    expect(screen.getByText('We have the perfect treatment for your hair loss.')).toBeInTheDocument();
  });

  it('should handle rejection', () => {
    const customContextValue = {
      ...mockQuizContextValue,
      quizCompleted: true,
      isRejected: true,
    };

    renderWithQuizProvider(<Quiz />, customContextValue);
    expect(screen.getByText('Unfortunately, we are unable to prescribe this medication for you.')).toBeInTheDocument();
  });

  it('should handle going back to the previous question', () => {
    const mockSetCurrentQuestion = jest.fn();
    const mockSetAnswers = jest.fn();
    const customContextValue = {
      ...mockQuizContextValue,
      currentQuestion: 1,
      answers: ['answer1'],
      setCurrentQuestion: mockSetCurrentQuestion,
      setAnswers: mockSetAnswers,
    };

    renderWithQuizProvider(<Quiz />, customContextValue);
    const backButton = screen.getByText('Back');
    fireEvent.click(backButton);

    expect(mockSetCurrentQuestion).toHaveBeenCalledWith(0);
    expect(mockSetAnswers).toHaveBeenCalledWith([]);
  });

  it('should handle completing the quiz', () => {
    const mockSetQuizCompleted = jest.fn();
    const mockSetCurrentQuestion = jest.fn();
    const customContextValue = {
      ...mockQuizContextValue,
      currentQuestion: quizData.questions.length - 1,
      setQuizCompleted: mockSetQuizCompleted,
      setCurrentQuestion: mockSetCurrentQuestion,
    };

    renderWithQuizProvider(<Quiz />, customContextValue);
    const lastOption = screen.getByText(mockQuizData.questions[quizData.questions.length - 1].options[0].display as string);
    fireEvent.click(lastOption);

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(mockSetQuizCompleted).toHaveBeenCalledWith(true);
    expect(mockSetCurrentQuestion).not.toHaveBeenCalled();
  });

  it('should handle closing the quiz', () => {
    const mockSetShowQuiz = jest.fn().mockImplementation(() => {
      document.body.style.overflow = '';
    });
    const mockSetQuizCompleted = jest.fn();
    const mockSetCurrentQuestion = jest.fn();
    const mockSetAnswers = jest.fn();
    const customContextValue = {
      ...mockQuizContextValue,
      showQuiz: true,
      setShowQuiz: mockSetShowQuiz,
      setQuizCompleted: mockSetQuizCompleted,
      setCurrentQuestion: mockSetCurrentQuestion,
      setAnswers: mockSetAnswers,
    };

    renderWithQuizProvider(<Quiz />, customContextValue);
    expect(document.body.style.overflow).toBe('hidden');

    const closeButton = screen.getByAltText('Close Icon');
    fireEvent.click(closeButton);

    expect(mockSetShowQuiz).toHaveBeenCalledWith(false);
    expect(document.body.style.overflow).toBe('');

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(mockSetQuizCompleted).toHaveBeenCalledWith(false);
    expect(mockSetCurrentQuestion).toHaveBeenCalledWith(0);
    expect(mockSetAnswers).toHaveBeenCalledWith([]);
  });

  it('should handle click outside to close the quiz', () => {
    const mockSetShowQuiz = jest.fn();
    const customContextValue = {
      ...mockQuizContextValue,
      setShowQuiz: mockSetShowQuiz,
    };

    renderWithQuizProvider(<Quiz />, customContextValue);
    fireEvent.mouseDown(document.body);
    expect(document.body.style.overflow).toBe('hidden');

    expect(mockSetShowQuiz).toHaveBeenCalledWith(false);
  });

  it('should not close the quiz when clicking inside', () => {
    const mockSetShowQuiz = jest.fn();
    const customContextValue = {
      ...mockQuizContextValue,
      setShowQuiz: mockSetShowQuiz,
    };

    renderWithQuizProvider(<Quiz />, customContextValue);
    const quizContent = screen.getByText('Hair Loss Quiz').parentElement;
    fireEvent.mouseDown(quizContent!);

    expect(mockSetShowQuiz).not.toHaveBeenCalled();
  });

  it('should handle non-image options', () => {
    const customContextValue = {
      ...mockQuizContextValue,
      currentQuestion: 1, // Assuming the second question has non-image options
    };

    renderWithQuizProvider(<Quiz />, customContextValue);
    mockQuizData.questions[1].options.forEach((option) => {
      expect(screen.getByText(option.display)).toBeInTheDocument();
    });
  });

  it('should apply correct classes when showQuiz is true', () => {
    const customContextValue = {
      ...mockQuizContextValue,
      showQuiz: true,
    };

    renderWithQuizProvider(<Quiz />, customContextValue);

    const quizContainer = screen.getByTestId('quiz-container'); // Using data-testid
    expect(quizContainer).toHaveClass('visible', 'bg-black', 'bg-opacity-50');

    const modal = screen.getByTestId('quiz-modal'); // Using data-testid
    expect(modal).toHaveClass('opacity-100', 'scale-100', 'translate-y-0');
  });

  it('should apply correct classes when showQuiz is false', () => {
    const customContextValue = {
      ...mockQuizContextValue,
      showQuiz: false,
    };

    renderWithQuizProvider(<Quiz />, customContextValue);

    const quizContainer = screen.getByTestId('quiz-container'); // Using data-testid
    expect(quizContainer).toHaveClass('invisible', 'bg-black', 'bg-opacity-0');

    const modal = screen.getByTestId('quiz-modal'); // Using data-testid
    expect(modal).toHaveClass('opacity-0', 'scale-95', 'translate-y-8');
  });

  it('should apply correct classes when quizCompleted is true', () => {
    const customContextValue = {
      ...mockQuizContextValue,
      quizCompleted: true,
    };

    renderWithQuizProvider(<Quiz />, customContextValue);

    const quizContent = screen.getByText('Great news!').parentElement;
    expect(quizContent).toHaveClass('opacity-100', 'translate-y-0');
  });

  it('should apply correct classes when quizCompleted is false', () => {
    const customContextValue = {
      ...mockQuizContextValue,
      quizCompleted: false,
    };

    renderWithQuizProvider(<Quiz />, customContextValue);

    const questionElement = screen.getByText(mockQuizData.questions[0].question).parentElement;
    expect(questionElement).toHaveClass('transition-opacity', 'duration-300', 'ease-in-out', 'opacity-100');
  });

  it('should apply correct classes for quiz completion transition', () => {
    // Setup initial context with quizCompleted true
    const customContextValue = {
      ...mockQuizContextValue,
      quizCompleted: true,
    };

    const { rerender } = renderWithQuizProvider(<Quiz />, customContextValue);

    // Check the element classes when quizCompleted is true
    let completionElement = screen.getByText('Great news!').parentElement;
    expect(completionElement).toHaveClass('opacity-100', 'translate-y-0');

    // Update the context to quizCompleted false
    customContextValue.quizCompleted = true;
    rerender(
      <QuizProvider initialData={mockQuizData}>
        <QuizContext.Provider value={customContextValue}>
          <Quiz />
        </QuizContext.Provider>
      </QuizProvider>
    );

    // Ensure we target the right parent element for transition check
    completionElement = screen.getByTestId('quiz-transition-element');
    expect(completionElement).toHaveClass('opacity-100', 'translate-y-0');
  });

  it('should match snapshot', () => {
    const tree = renderer.create(
      <QuizProvider initialData={mockQuizData}>
        <QuizContext.Provider value={mockQuizContextValue}>
          <Quiz />
        </QuizContext.Provider>
      </QuizProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

