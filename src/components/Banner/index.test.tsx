import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Banner from './index';

jest.mock('@/contexts/quiz.context', () => ({
  useQuiz: jest.fn(() => ({
    setShowQuiz: jest.fn(),
  })),
}));

describe('Components/Banner', () => {
  it('should render the logo', () => {
    render(<Banner />);
    const logo = screen.getByAltText('alto');
    expect(logo).toBeInTheDocument();
  });

  it('should render the main heading', () => {
    render(<Banner />);
    const heading = screen.getByText(/Be good to yourself/i);
    expect(heading).toBeInTheDocument();
  });

  it('should render the description', () => {
    render(<Banner />);
    const description = screen.getByText(/We're working around the clock/i);
    expect(description).toBeInTheDocument();
  });

  it('should render the "TAKE THE QUIZ" button', () => {
    render(<Banner />);
    const button = screen.getByText('TAKE THE QUIZ');
    expect(button).toBeInTheDocument();
  });

  it('should call setShowQuiz when the button is clicked', () => {
    const mockSetShowQuiz = jest.fn();
    jest.spyOn(require('@/contexts/quiz.context'), 'useQuiz').mockImplementation(() => ({
      setShowQuiz: mockSetShowQuiz,
    }));

    render(<Banner />);
    const button = screen.getByText('TAKE THE QUIZ');
    fireEvent.click(button);
    expect(mockSetShowQuiz).toHaveBeenCalledWith(true);
  });

  it('should match snapshot', () => {
    const tree = renderer.create(<Banner />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});