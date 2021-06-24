import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {
  Grid,
  Button,
  ButtonGroup,
  Box,
  Heading,
  Divider,
  Text,
  Flex,
} from '@chakra-ui/react';
import { GetStaticProps, InferGetServerSidePropsType } from 'next';

interface Props {
  data: {
    count: number;
    next?: string;
    previous?: string;
    results: {
      name: string;
      url: string;
    }[];
  };
}

export default function Home({ data }: Props) {
  const [pokemonList, setPokemonList]: [typeof data, (data) => void] =
    React.useState(data);
  const [currentPage, setCurrentPage]: [number, (number) => void] =
    React.useState(1);
  const limit = 20;

  async function nextPage() {
    const res = await fetch(pokemonList.next);
    const newData: typeof data = await res.json();

    setCurrentPage(currentPage + 1);
    setPokemonList(newData);
  }
  async function prevPage() {
    const res = await fetch(pokemonList.previous);
    const newData: typeof data = await res.json();

    currentPage > 0 ? setCurrentPage(currentPage - 1) : null;
    setPokemonList(newData);
  }

  console.log(data);
  return (
    <Box margin="6">
      <Heading as="h1" marginBottom="6">
        Pokedex
      </Heading>
      <Divider colorScheme="gray" />
      <ButtonGroup margin="2rem" fontSize="xl">
        <Button
          colorScheme="gray"
          onClick={prevPage}
          disabled={!pokemonList.previous}
        >
          Previous Page
        </Button>
        <Text margin="auto" padding="0 2rem">
          Page {currentPage} of {Math.floor(pokemonList.count / limit)}
        </Text>
        <Button colorScheme="gray" onClick={nextPage}>
          Next Page
        </Button>
      </ButtonGroup>
      <Grid
        templateColumns="repeat(auto-fit, minmax(250px, 1fr))"
        gap={6}
        marginTop="6"
      >
        {pokemonList.results.map((pokemon, index) => (
          <Flex
            key={pokemon.name}
            borderRadius="lg"
            shadow="lg"
            padding="6"
            height="250px"
            justifyContent="space-between"
            flexDirection="column"
          >
            <Heading style={{ textTransform: 'capitalize' }} marginBottom="3">
              #{index + 1 + (currentPage - 1) * limit} {pokemon.name}
            </Heading>
            <Link
              href={`/pokemon/${pokemon.name}`}
              key={`${pokemon.name}-${index}`}
            >
              <Button as="a" colorScheme="teal">
                More information
              </Button>
            </Link>
          </Flex>
        ))}
      </Grid>
      <ButtonGroup margin="2rem">
        <Button
          colorScheme="gray"
          onClick={prevPage}
          disabled={!pokemonList.previous}
        >
          Previous Page
        </Button>
        <Text margin="auto" padding="0 2rem">
          Page {currentPage} of {Math.floor(pokemonList.count / limit)}
        </Text>
        <Button colorScheme="gray" onClick={nextPage} disabled={!nextPage}>
          Next Page
        </Button>
      </ButtonGroup>
    </Box>
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
