import '@testing-library/jest-dom/extend-expect';

declare global {
  namespace NodeJS {
    interface Global {
      fetch: jest.Mock;
    }
  }
}

// Adding this line to make it a module and avoid TypeScript errors
export {};