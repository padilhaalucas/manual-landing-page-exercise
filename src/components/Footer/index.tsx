import React from 'react';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="bg-sage-green-manual w-full pt-14 px-16 lg:px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:items-start mb-12">
          <div className="mb-8 md:mb-0">
            <Image src="/assets/logo.svg" alt="Manual logo" width={40} height={40} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-20 md:gap-16">
            <div className="text-dark-green-manual">
              <h5 className="font-semibold tracking-widest text-sm mb-4">PRODUCT</h5>
              <ul className="space-y-2 text-sm">
                {['Popular', 'Trending', 'Guided', 'Products'].map(item => <li key={item} className="py-2">{item}</li>)}
              </ul>
            </div>
            <div className="text-dark-green-manual">
              <h5 className="font-semibold tracking-widest text-sm mb-4">COMPANY</h5>
              <ul className="space-y-2 text-sm">
                {['Press', 'Mission', 'Strategy', 'About'].map(item => <li key={item} className="py-2">{item}</li>)}
              </ul>
            </div>
            <div className="text-dark-green-manual">
              <h5 className="font-semibold tracking-widest text-sm mb-4">INFO</h5>
              <ul className="space-y-2 text-sm">
                {['Support', 'Customer Service', 'Get started'].map(item => <li key={item} className="py-2">{item}</li>)}
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-dark-green-manual tracking-widest text-sm mb-4">FOLLOW US</h5>
              <div className="flex space-x-4 py-2">
                <a href="#" aria-label="Facebook">
                  <Image src="/assets/facebook.svg" alt="Facebook" width={24} height={24} />
                </a>
                <a href="#" aria-label="Google">
                  <Image src="/assets/google.svg" alt="Google" width={24} height={24} />
                </a>
                <a href="#" aria-label="Twitter">
                  <Image src="/assets/twitter.svg" alt="Twitter" width={24} height={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-dark-green/20 text-center items-center h-16 flex justify-center text-sm text-dark-green-manual/80">
          <span>
            © 2021 Manual. All rights reserved
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;