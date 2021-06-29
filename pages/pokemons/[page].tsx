import React from 'react';
import { Grid, Box, Center, Heading, Button } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import PokemonCard from '../../components/PokemonCard';
import { PokeAPI } from 'pokeapi-types';
import PaginationGroup from '../../components/PaginationGroup';
import { useRouter } from 'next/dist/client/router';

interface Props {
  data: PokeAPI.NamedAPIResourceList;
}

export default function PokemonListPage({ data }: Props) {
  const router = useRouter();
  const { query } = router;
  // value of page is a string so we need to convert it to a number
  const currentPage: number = +query.page;
  // env gives us only a string so we need to convert it
  const limit = parseInt(process.env.limit);
  console.log(typeof process.env.limit);

  if (currentPage > Math.floor(data.count / limit)) {
    return (
      <Center m={6} flexDir="column">
        <Head>
          <title>Page does not exist</title>
        </Head>
        <Heading>This page does not exist</Heading>
        <Button onClick={() => router.back()} margin={6}>
          Go Back
        </Button>
      </Center>
    );
  }
  return (
    <>
      <Head>
        <title>
          Pokedex | Page {currentPage} of {Math.floor(data.count / limit)}
        </title>
      </Head>
      <Box margin="6" data-testid="body">
        <PaginationGroup
          currentPage={currentPage}
          total={data.count}
          limit={limit}
        ></PaginationGroup>
        <Grid
          templateColumns="repeat(auto-fit, minmax(250px, 1fr))"
          gap={6}
          marginTop="6"
        >
          {data.results.map((pokemon, index) => (
            <PokemonCard
              key={pokemon.name}
              pokemon={pokemon}
              index={index}
              currentPage={currentPage}
              limit={limit}
            ></PokemonCard>
          ))}
        </Grid>
        <PaginationGroup
          currentPage={currentPage}
          limit={limit}
          total={data.count}
        ></PaginationGroup>
      </Box>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // value of params.page is a string so we convert it to a number
  const page = +params.page;
  let res;
  // for the first page we fetch without params
  if (page === 1) {
    res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${process.env.limit}`
    );
  }
  // all others we fetch the data for the current page
  else {
    res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${
        +process.env.limit * page
      }&limit=${process.env.limit}`
    );
  }

  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};
