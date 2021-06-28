import { render, screen, waitFor } from '@testing-library/react';
import { getPage } from 'next-page-tester';
import PokemonCard from '../components/PokemonCard';

import { mockedPokemonList } from '../__mocks__/pokemonList.mock';

describe('Home', () => {
  test('Index page renders all pokemons with correct name', async () => {
    const { render } = await getPage({ route: '/' });
    render();

    await waitFor(() => {
      mockedPokemonList.results.map(({ name }) => {
        expect(screen.getByRole('heading', { name: name })).toBeInTheDocument();
      });
    });
  });
});

describe('PokemonCard', () => {
  test('displays the correct name and link', async () => {
    const pokemonCard = render(<PokemonCard pokemon={{ name: 'name' }} />);
    const title = await pokemonCard.findByRole('heading');
    const link = await pokemonCard.findByRole('link');
    expect(title.textContent).toBe('name');
    expect(link.getAttribute('href')).toBe('/pokemon/name');
  });
});

describe('PokemonDetail', () => {
  test('displays info if no picture available', async () => {
    const { render } = await getPage({
      route: '/pokemon/bulbasaur',
    });
    render();
    expect(screen.getByTestId('no-picture-info').toBeInTheDocument);
  });
});
