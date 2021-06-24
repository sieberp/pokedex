import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import { GetStaticPaths, GetStaticProps } from 'next';

export default function PokemonPage({ pokemon }) {
  console.log(pokemon);
  const src = pokemon.sprites.front_default;
  return (
    <Box>
      <h1>{pokemon.name.toUpperCase()}</h1>
      <Image src={src} alt={pokemon.name} width="200" height="200"></Image>
    </Box>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1200');
  const data = await res.json();
  const pokemons = data.results;

  const paths = pokemons.map((pokemon) => ({
    params: { name: pokemon.name },
  }));

  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
  const pokemon = await res.json();

  return { props: { pokemon } };
}
