import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Teste o componente FavoritePokemons.js', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const textEl = screen.getByText(/No favorite pokemon found/i);
    expect(textEl).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);
    const detailsEl = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsEl);
    const checkBoxEl = screen.getByLabelText(/pokémon favoritado/i);
    userEvent.click(checkBoxEl);
    const favoritePokemons = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoritePokemons);
    const textEl = screen.getByText(/pikachu/i);
    expect(textEl).toBeInTheDocument();
  });
});
