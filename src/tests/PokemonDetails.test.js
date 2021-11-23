import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente PokemonDetails.js', () => {
  test('Teste se as informações detalhadas são mostradas na tela', () => {
    renderWithRouter(<App />);
    const detailsEl = screen.getByRole('link', { name: /more details/i });
    expect(detailsEl).toBeInTheDocument();
    userEvent.click(detailsEl);
    const nameDetails = screen
      .getByRole('heading', { name: /Pikachu Details/i, level: 2 });
    expect(nameDetails).toBeInTheDocument();
    expect(detailsEl).not.toBeInTheDocument();
    const headingSummary = screen.getByRole('heading', { name: /Summary/i, level: 2 });
    expect(headingSummary).toBeInTheDocument();
    const resumeEl = screen.getByText(/This intelligent/i);
    expect(resumeEl).toBeInTheDocument();
  });

  test('Teste se as informações detalhadas são mostradas na tela', () => {
    renderWithRouter(<App />);
    const detailsEl = screen.getByRole('link', { name: /more details/i });
    expect(detailsEl).toBeInTheDocument();
    userEvent.click(detailsEl);
    const locationEl = screen
      .getByRole('heading', { name: /Game Locations of Pikachu/i, level: 2 });
    expect(locationEl).toBeInTheDocument();
    const habitatImg = screen.getAllByRole('img', { name: /Pikachu location/i });
    expect(habitatImg).toHaveLength(2);
    const habitatName = screen.getAllByText(/Kanto/i);
    expect(habitatName).toHaveLength(2);
    expect(habitatImg[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(habitatImg[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  test('Teste se o usuário pode favoritar um pokémon', () => {
    renderWithRouter(<App />);
    const detailsEl = screen.getByRole('link', { name: /more details/i });
    expect(detailsEl).toBeInTheDocument();
    userEvent.click(detailsEl);
    const checkBoxEl = screen.getByLabelText(/pokémon favoritado/i);
    expect(checkBoxEl).toBeInTheDocument();
    userEvent.click(checkBoxEl);
    const favoritImg = screen
      .getByRole('img', { name: /Pikachu is marked as favorite/i });
    expect(favoritImg).toBeInTheDocument();
    userEvent.click(checkBoxEl);
    expect(favoritImg).not.toBeInTheDocument();
  });
});
