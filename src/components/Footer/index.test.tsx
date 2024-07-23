import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer'
import Footer from './index';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />
  },
}));

describe('Components/Footer', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it('should render the logo', () => {
    const logo = screen.getByAltText('Manual logo');
    expect(logo).toBeInTheDocument();
  });

  it('should render all section headings', () => {
    const headings = ['PRODUCT', 'COMPANY', 'INFO', 'FOLLOW US'];
    headings.forEach(heading => {
      expect(screen.getByText(heading)).toBeInTheDocument();
    });
  });

  it('should render all product items', () => {
    const items = ['Popular', 'Trending', 'Guided', 'Products'];
    items.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it('should render all company items', () => {
    const items = ['Press', 'Mission', 'Strategy', 'About'];
    items.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it('should render all info items', () => {
    const items = ['Support', 'Customer Service', 'Get started'];
    items.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it('should render social media icons', () => {
    const socialMedia = ['Facebook', 'Google', 'Twitter'];
    socialMedia.forEach(platform => {
      const icon = screen.getByAltText(platform);
      expect(icon).toBeInTheDocument();
    });
  });

  it('should render the copyright text', () => {
    const copyright = screen.getByText('© 2021 Manual. All rights reserved');
    expect(copyright).toBeInTheDocument();
  });

  it('should render the correct number of list items', () => {
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(11); //
  });

  it('should render the correct number of social media links', () => {
    const socialLinks = screen.getAllByRole('link');
    expect(socialLinks).toHaveLength(3);
  });

  it('should match snapshot', () => {
    const tree = renderer.create(<Footer />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});