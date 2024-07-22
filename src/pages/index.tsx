import { GetServerSideProps } from 'next';

import { QuizProvider } from '@/contexts/quiz.context';
import Banner from '@/components/Banner';
import Content from '@/components/Content';
import Footer from '@/components/Footer';
import Quiz from '@/components/Quiz';
import { fetchQuizData } from '@/utils/api';
import { QuizData } from '@/types/quiz';

interface HomeProps {
  quizData: QuizData;
}

export default function Home({ quizData }: HomeProps) {
  return (
    <QuizProvider initialData={quizData}>
      <main className="flex min-h-screen w-full flex-col items-center justify-between overflow-x-hidden scroll-container">
        <Banner />
        <Content />
        <Quiz />
        <Footer />
      </main>
    </QuizProvider>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    const quizData = await fetchQuizData();
    return { props: { quizData } };
  } catch (error) {
    console.error('Failed to fetch quiz data:', error);
    return { notFound: true };
  }
};