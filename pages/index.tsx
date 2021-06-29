import React from 'react';
import { Grid, Box } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import PokemonCard from '../components/PokemonCard';
import { PokeAPI } from 'pokeapi-types';
import PaginationGroup from '../components/PaginationGroup';
import axios from 'axios';

interface Props {
  data: PokeAPI.NamedAPIResourceList;
}

export default function Home({ data }: Props) {
  const limit = parseInt(process.env.limit);
  return (
    <>
      <Head>
        <title>Pokedex | Page 1 of {Math.floor(data.count / limit)}</title>
      </Head>
      <Box margin="6" data-testid="body">
        <PaginationGroup
          currentPage={1}
          limit={limit}
          total={data.count}
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
              currentPage={1}
              limit={limit}
            ></PokemonCard>
          ))}
        </Grid>
        <PaginationGroup
          currentPage={1}
          limit={limit}
          total={data.count}
        ></PaginationGroup>
      </Box>
    </>
  );
  return;
}

// rendering the first page during build for better first load performance
export const getStaticProps: GetStaticProps = async () => {
  const res = await axios(`https://pokeapi.co/api/v2/pokemon`);
  const data = res.data;

  return {
    props: {
      data,
    },
  };
};
