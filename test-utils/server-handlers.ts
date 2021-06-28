import { rest } from 'msw';

import { mockedPokemonList } from '../__mocks__/pokemonList.mock';
import { pokemonMock } from '../__mocks__/pokemon.mock';
import { pokemonEvolutionMock } from '../__mocks__/pokemonEvolution.mock';
import { pokemonSpeciesMock } from '../__mocks__/pokemonSpeciesMock';

const handlers = [
  rest.get('https://pokeapi.co/api/v2/pokemon', (_req, res, ctx) => {
    return res(ctx.json(mockedPokemonList));
  }),
  rest.get('https://pokeapi.co/api/v2/pokemon/bulbasaur', (_req, res, ctx) => {
    return res(ctx.json(pokemonMock));
  }),
  rest.get(
    'https://pokeapi.co/api/v2/pokemon-species/bulbasaur/',
    (_req, res, ctx) => {
      return res(ctx.json(pokemonSpeciesMock));
    }
  ),
  rest.get('https://pokeapi.co/api/v2/evolution-chain/1/', (_req, res, ctx) => {
    return res(ctx.json(pokemonEvolutionMock));
  }),
];

export { handlers };
