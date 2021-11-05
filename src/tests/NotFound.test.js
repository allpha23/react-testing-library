import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste o componente NotFound.js', () => {
  test('Teste se contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const notFoundEl = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(notFoundEl).toBeInTheDocument();
  });

  test('Teste se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);
    const imgEl = screen.getByRole('img', { name: /not found/i });
    expect(imgEl).toBeInTheDocument();
    expect(imgEl).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
