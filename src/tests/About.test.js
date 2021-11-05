import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Teste o componente About.js', () => {
  test('teste se contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const aboutEl = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(aboutEl).toBeInTheDocument();
  });

  test('Teste se contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const text1 = screen.getByText(/This application simulates a Pokédex/i);
    expect(text1).toBeInTheDocument();
    const text2 = screen.getByText(/One can filter Pokémons by type/i);
    expect(text2).toBeInTheDocument();
  });

  test('Teste se contém uma imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const imgEl = screen.getByRole('img', { name: /Pokédex/i });
    expect(imgEl).toBeInTheDocument();
    expect(imgEl).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
