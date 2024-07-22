'use client';

import React from 'react';
import Image from 'next/image';
import { useQuiz } from '@/contexts/quiz.context';

const Banner: React.FC = () => {
  const { setShowQuiz } = useQuiz();

  return (
    <section
      className="bg-banner bg-cover bg-center bg-no-repeat min-h-screen w-full py-8 px-16 sm:px-20 md:px-24 lg:px-32 xl:px-36 flex flex-col"
    >
      <div>
        <Image
          priority
          src="/assets/logo.svg"
          height={40}
          width={40}
          alt="alto"
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
        />
      </div>

      <div className="mt-12 sm:mt-24 md:mt-30 lg:mt-32 w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
        <h1 className="text-5xl sm:text-7xl xl:text-8xl font-semibold sm:font-medium mb-4 text-dark-green-manual leading-tight">
          Be good <br /> to yourself
        </h1>
        <p className="mb-8 sm:mb-10 md:mb-12 lg:mb-8 text-xl sm:text-lg text-dark-green-manual w-10/12 sm:w-5/6 md:w-4/5">
          We're working around the clock to bring you a holistic approach to your wellness. From top to bottom, inside and out.
        </p>
        <button
          className="bg-dark-red-manual text-white text-sm font-bold px-6 py-3 sm:px-8 sm:py-3 md:px-10 md:py-4 rounded hover:bg-opacity-90 transition-colors duration-300"
          onClick={() => setShowQuiz(true)}
        >
          TAKE THE QUIZ
        </button>
      </div>
    </section>
  );
};

export default Banner;