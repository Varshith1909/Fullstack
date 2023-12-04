import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import '@testing-library/jest-dom/extend-expect';

describe('Header Component', () => {
  it('should display the correct text', () => {
    render(<Header />);
    expect(screen.getByText('We care for your health Every moment')).toBeInTheDocument();
    expect(screen.getByText('If you are searching for the best website to assist you in managing all the medicines in your store, you have found the right place.')).toBeInTheDocument();
  });

  it('should display an image with the correct alt text', () => {
    render(<Header />);
    const image = screen.getByAltText('My Image');
    expect(image).toBeInTheDocument();
    expect(image.tagName).toBe('IMG');
  });
});
