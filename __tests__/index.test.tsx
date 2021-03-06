/* eslint-disable @next/next/no-img-element */
import { render, screen, waitFor } from '@testing-library/react';
import { getPage } from 'next-page-tester';
import PokemonCard from '../components/PokemonCard';

import { mockedPokemonList } from '../__mocks__/pokemonList.mock';
import { pokemonMock } from '../__mocks__/pokemon.mock';

// mocking next image so the test can run
// eslint-disable-next-line react/display-name
jest.mock('next/image', () => ({ src, alt }) => <img src={src} alt={alt} />);

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
    const pokemonCard = render(
      <PokemonCard
        pokemon={{ name: 'name', url: 'https://mock.api/call' }}
        currentPage={1}
        limit={20}
        key="adfjalkdf"
        index={1}
      />
    );
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
    expect(screen.getByTestId('no-picture-info')).toBeInTheDocument();
  });
});

describe('PokemonDetail', () => {
  test('displays correct order', async () => {
    const { render } = await getPage({
      route: '/pokemon/bulbasaur',
    });
    render();

    const orderNumber = screen.getByTestId('order-number');
    expect(orderNumber.textContent).toBe(`Order #${pokemonMock.order}`);
  });
});

describe('PokemonDetail', () => {
  test('displays list of all abilities', async () => {
    const { render } = await getPage({
      route: '/pokemon/bulbasaur',
    });
    render();

    const abilitiesList = screen.getByTestId('abilities-list');
    expect(abilitiesList.childElementCount).toBe(pokemonMock.abilities.length);
  });
});

describe('PokemonDetail', () => {
  test('displays list of all moves', async () => {
    const { render } = await getPage({
      route: '/pokemon/bulbasaur',
    });
    render();

    const movesList = screen.getByTestId('moves-list');
    expect(movesList.childElementCount).toBe(pokemonMock.moves.length);
  });
});
