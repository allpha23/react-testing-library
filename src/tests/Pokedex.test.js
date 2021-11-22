import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente Pokedex.js', () => {
  test('Teste se contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const headingEl = screen
      .getByRole('heading', { name: /encountered pokémons/i, level: 2 });
    expect(headingEl).toBeInTheDocument();
  });

  test('Teste se exibe o próximo Pokémon da lista', () => {
    renderWithRouter(<App />);
    const maxClicks = 8;
    const fistPokemon = screen.getByText(/pikachu/i);
    expect(fistPokemon).toBeInTheDocument();
    const nextPokemonBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextPokemonBtn).toBeInTheDocument();
    for (let i = 0; i < maxClicks; i += 1) {
      userEvent.click(nextPokemonBtn);
    }
    const nextPokemonEl = screen.getByText(/Dragonair/i);
    expect(nextPokemonEl).toBeInTheDocument();
    userEvent.click(nextPokemonBtn);
    expect(fistPokemon).toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokemonEl = screen.getAllByRole('img');
    expect(pokemonEl).toHaveLength(1);
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const filterBtnName = ['Electric', 'Fire', 'Bug', 'Poison',
      'Psychic', 'Normal', 'Dragon'];
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    const maxFilterButtons = 7;
    for (let i = 0; i < maxFilterButtons; i += 1) {
      expect(filterButtons[i]).toBeInTheDocument();
      userEvent.click(filterButtons[i]);
      const pokemon = screen.getAllByText(filterBtnName[i]);
      expect(pokemon).toHaveLength(2);
      const filterAll = screen.getByRole('button', { name: /All/i });
      expect(filterAll).toBeEnabled();
    }
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const filterAll = screen.getByRole('button', { name: /All/i });
    expect(filterAll).toBeInTheDocument();
    userEvent.click(filterAll);
    const nextPokemonBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextPokemonBtn).toBeEnabled();
  });
});
