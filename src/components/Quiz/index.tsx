import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useQuiz } from '@/contexts/quiz.context';
import quizData from '@/mocked-data-source/quiz.json';

const Quiz: React.FC = () => {
  const {
    currentQuestion,
    answers,
    showQuiz,
    quizCompleted,
    setCurrentQuestion,
    setAnswers,
    setShowQuiz,
    setQuizCompleted,
    isRejected
  } = useQuiz();

  const modalRef = useRef<HTMLDivElement>(null);
  const [fade, setFade] = useState(false);

  const handleAnswer = (answer: string) => {
    setFade(true);
    setTimeout(() => {
      const newAnswers = [...answers, answer];
      setAnswers(newAnswers);

      if (currentQuestion < quizData.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setQuizCompleted(true);
      }
      setFade(false);
    }, 300);
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  const closeQuiz = useCallback(() => {
    setShowQuiz(false);
    setTimeout(() => {
      setQuizCompleted(false);
      setCurrentQuestion(0);
      setAnswers([]);
    }, 300);
  }, [setShowQuiz, setQuizCompleted, setCurrentQuestion, setAnswers]);

  const question = quizData.questions[currentQuestion];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeQuiz();
      }
    };

    if (showQuiz) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [showQuiz, closeQuiz]);

  return (
    <div
      data-testid="quiz-container"
      className={`
        fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ease-in-out
        ${showQuiz ? 'visible bg-black bg-opacity-50' : 'invisible bg-black bg-opacity-0'}
      `}
    >
      <div
        data-testid="quiz-modal"
        ref={modalRef}
        className={`
          bg-white rounded-lg shadow-xl w-full max-w-md overflow-x-hidden max-h-[40rem] transition-all duration-300 ease-in-out
          ${showQuiz ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'}
        `}
      >
        {/* Header */}
        <div className="bg-sage-green p-6 border-b border-b-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-dark-green-manual">Hair Loss Quiz</h2>
          <button onClick={closeQuiz} className="text-dark-green-manual">
            <Image src={"/assets/close-icon.svg"} alt={"Close Icon"} width={24} height={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {quizCompleted ? (
            <div
              data-testid="quiz-transition-element"
              className="text-center transition-all duration-300 ease-in-out opacity-100 translate-y-0"
            >
              {isRejected && (
                <>
                  <h3 className="text-2xl font-bold mb-4 text-dark-green-manual">
                    Unfortunately, we are unable to prescribe this medication for you.
                  </h3>
                  <p className="mb-6 text-dark-green-manual/80">
                    This is because finasteride can alter the PSA levels, which may be used to monitor for cancer.
                    You should discuss this further with your GP or specialist if you would still like this medication.
                  </p>
                </>
              )}
              {!isRejected && (
                <>
                  <h3 className="text-4xl font-bold mb-4 text-dark-green-manual">
                    Great news!
                  </h3>
                  <h4 className="text-2xl font-bold mb-4 text-dark-green-manual">We have the perfect treatment for your hair loss.</h4>
                  <p className="mb-6 text-dark-green-manual/80">
                    Proceed to <Link className="text-blue-500 font-bold" href="https://manual.co" target="_blank">www.manual.co</Link>, and prepare to say hello to your new hair!
                  </p>
                </>
              )}

              <button
                className="bg-dark-green-manual text-white px-6 py-2 rounded hover:bg-opacity-90 active:bg-opacity-100 transition-all duration-300"
                onClick={closeQuiz}
              >
                Close Quiz
              </button>
            </div>
          ) : (
            <div className={`transition-opacity duration-300 ease-in-out ${fade ? 'opacity-0' : 'opacity-100'}`}>
              <h3 className="text-xl font-semibold mb-4 text-dark-green-manual">{question.question}</h3>
              <div className="space-y-4">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    className={`
                      flex justify-center items-center w-full p-4 border border-gray-200 rounded-lg
                      text-dark-green-manual hover:bg-sage-green-manual hover:border-dark-green-manual transition-all duration-300
                    `}
                    onClick={() => handleAnswer(option.value as string)}
                  >
                    {option.display.includes('<img') ? (
                      <div className="flex flex-row">
                        <span className="absolute left-10 font-black text-3xl text-light-blue-manual tracking-tight">
                          {index + 1}
                        </span>
                        <div dangerouslySetInnerHTML={{ __html: option.display }} />
                      </div>
                    ) : (
                      option.display
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!quizCompleted && (
          <div className="bg-gray-100 px-6 py-4 flex flex-col justify-between items-start">
            <div className="text-sm text-dark-green-manual/80">
              Question <strong>{currentQuestion + 1}</strong> of {quizData.questions.length}
            </div>
            {currentQuestion > 0 && (
              <button
                className="text-dark-green-manual hover:text-opacity-75 font-semibold"
                onClick={handleBack}
              >
                Back
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;