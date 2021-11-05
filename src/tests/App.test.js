import React from "react";
import { screen } from "@testing-library/dom";
import renderWithRouter from "./renderWithRouter";
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Teste o componente App.js', () => {
  test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const homeEl = screen.getByRole('link', { name: /home/i });
    const aboutEl = screen.getByRole('link', { name: /about/i });
    const favoritesEl = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(homeEl).toBeInTheDocument();
    expect(aboutEl).toBeInTheDocument();
    expect(favoritesEl).toBeInTheDocument();
  });
    
  test('Teste se a aplicação é redirecionada para /, ao clicar em Home', () => {
    const { history } = renderWithRouter(<App />);
    const homeEl = screen.getByRole('link', { name: /home/i });
    expect(homeEl).toBeInTheDocument();
    userEvent.click(homeEl);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Teste se a aplicação é redirecionada para /about, ao clicar em About', () => {
    const { history } = renderWithRouter(<App />);
    const aboutEl = screen.getByRole('link', { name: /about/i });
    expect(aboutEl).toBeInTheDocument();
    userEvent.click(aboutEl);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Teste se a aplicação é redirecionada para /favorites, ao clicar em Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    const favoritesEl = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favoritesEl).toBeInTheDocument();
    userEvent.click(favoritesEl);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Teste se a aplicação é redirecionada para /Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/not-found');
    const { pathname } = history.location;
    expect(pathname).toBe('/not-found');
    const notFoundEl = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(notFoundEl).toBeInTheDocument();
  });
});
