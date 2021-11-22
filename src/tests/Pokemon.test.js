import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente Pokemon.js', () => {
  test('Teste se renderiza um card com as informações de pokémons', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');
    const averageEl = screen.getByTestId('pokemon-weight');
    expect(averageEl).toBeInTheDocument();
    const imgEl = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(imgEl).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Teste se o card contém um link exibir detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const detailsEl = screen.getByRole('link', { name: /more details/i });
    expect(detailsEl).toBeInTheDocument();
    userEvent.click(detailsEl);
    expect(history.location.pathname).toBe('/pokemons/25');
    const checkBoxEl = screen.getByLabelText(/pokémon favoritado/i);
    userEvent.click(checkBoxEl);
    const favoritImg = screen
      .getByRole('img', { name: /Pikachu is marked as favorite/i });
    expect(favoritImg).toHaveAttribute('src', '/star-icon.svg');
  });
});
