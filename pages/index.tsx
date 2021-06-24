import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Flex, Button, ButtonGroup, Spacer } from '@chakra-ui/react';
import { GetStaticProps } from 'next';

export default function Home({ data }) {
  const [pokemonList, setPokemonList] = React.useState(data);

  async function nextPage() {
    const res = await fetch(pokemonList.next);
    const newData = await res.json();

    setPokemonList(newData);
  }
  async function prevPage() {
    const res = await fetch(pokemonList.previous);
    const newData = await res.json();

    setPokemonList(newData);
  }

  return (
    <Flex height="100vh" direction="column">
      {pokemonList.results.map((pokemon, index) => (
        <Link
          href={`/pokemon/${pokemon.name}`}
          key={`${pokemon.name}-${index}`}
        >
          <a style={{ textTransform: 'capitalize' }}>{pokemon.name}</a>
        </Link>
      ))}
      <ButtonGroup>
        <Button
          colorScheme="gray"
          onClick={prevPage}
          disabled={!pokemonList.previous}
        >
          Previous Page
        </Button>
        <Button colorScheme="gray" onClick={nextPage}>
          Next Page
        </Button>
      </ButtonGroup>
    </Flex>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};
