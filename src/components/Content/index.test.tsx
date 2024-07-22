import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Content from './index';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />
  },
}));

describe('Components/Content', () => {

  it('should render the main heading', () => {
    render(<Content />);
    const heading = screen.getByText('What we can help with');
    expect(heading).toBeInTheDocument();
  });

  it('should render two ContentItem components', () => {
    render(<Content />);
    const hairLossItem = screen.getByText("Hair loss needn't be irreversible. We can help!");
    const erectileDysfunctionItem = screen.getByText('Erections can be a tricky thing. But no need to feel down!');
    expect(hairLossItem).toBeInTheDocument();
    expect(erectileDysfunctionItem).toBeInTheDocument();
  });

  it('should render the correct subtitles', () => {
    render(<Content />);
    const hairLossSubtitle = screen.getByText('HAIR LOSS');
    const erectileDysfunctionSubtitle = screen.getByText('ERECTILE DYSFUNCTION');
    expect(hairLossSubtitle).toBeInTheDocument();
    expect(erectileDysfunctionSubtitle).toBeInTheDocument();
  });

  it('should render the correct descriptions', () => {
    render(<Content />);
    const description = screen.getAllByText("We're working around the clock to bring you a holistic approach to your wellness. From top to bottom, inside and out.");
    expect(description).toHaveLength(2);
  });

  it('should render images with correct alt text', () => {
    render(<Content />);
    const hairLossImage = screen.getByAltText("Hair loss needn't be irreversible. We can help!");
    const erectileDysfunctionImage = screen.getByAltText('Erections can be a tricky thing. But no need to feel down!');
    expect(hairLossImage).toBeInTheDocument();
    expect(erectileDysfunctionImage).toBeInTheDocument();
  });

  it('should render the correct number for each ContentItem', () => {
    render(<Content />);
    const number1 = screen.getByText('01');
    const number2 = screen.getByText('02');
    expect(number1).toBeInTheDocument();
    expect(number2).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const tree = renderer.create(<Content />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});