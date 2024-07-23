import React from 'react';
import Image from 'next/image';

const ContentItem = ({ number, image, title, subtitle, description, reverse = false }: any) => (
  <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center lg:gap-32 relative`}>
    <div className={`absolute text-[100px] sm:text-[140px] md:text-[180px] lg:text-[400px] xl:text-[450px] font-medium text-light-blue-manual opacity-20 ${reverse ? 'left-0 lg:left-40' : 'right-0 lg:right-48'} top-[-5%] lg:top-1/2 transform -translate-y-1/2 z-0 tracking-tight`}>
      {number.padStart(2, '0')}
    </div>
    <div className="w-full lg:w-1/2 z-10">
      <Image
        src={image}
        alt={title}
        width={280}
        height={280}
        layout="responsive"
      />
    </div>
    <div className="w-full lg:w-1/2 z-10 bg-transparent py-8 sm:py-12 md:py-16 lg:py-20 lg:px-6">
      <p className="text-xs sm:text-sm text-dark-green-manual mb-4 sm:mb-6 font-normal tracking-widest">
        {subtitle}
      </p>
      <div className="w-full sm:w-5/6 md:w-3/4 lg:w-2/3">
        <h3 className="text-xl sm:text-2xl font-medium mb-3 sm:mb-4 text-dark-green-manual">
          {title}
        </h3>
        <p className="text-dark-green-manual text-sm sm:text-base leading-6 sm:leading-7">
          {description}
        </p>
      </div>
    </div>
  </div>
);

const Content: React.FC = () => {
  return (
    <section className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-60 pt-8 pb-12 sm:pb-16 md:pb-20 lg:pb-24 w-full mx-auto bg-white">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-6 sm:mt-8 md:mt-10 mb-20 sm:mb-12 md:mb-16 lg:mb-20 text-center text-dark-green-manual">
        What we can help with
      </h2>
      <div className="space-y-16 sm:space-y-20 md:space-y-24">
        <ContentItem
          number="1"
          image="/assets/hair-loss.jpg"
          title="Hair loss needn't be irreversible. We can help!"
          subtitle="HAIR LOSS"
          description="We're working around the clock to bring you a holistic approach to your wellness. From top to bottom, inside and out."
        />
        <ContentItem
          number="2"
          image="/assets/erectile-dysfunction.jpg"
          title="Erections can be a tricky thing. But no need to feel down!"
          subtitle="ERECTILE DYSFUNCTION"
          description="We're working around the clock to bring you a holistic approach to your wellness. From top to bottom, inside and out."
          reverse
        />
      </div>
    </section>
  );
};

export default Content;