import React from 'react';
import {
  Grid,
  Button,
  ButtonGroup,
  Box,
  Divider,
  Text,
} from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import PokemonCard from '../components/PokemonCard';
import { PokeAPI } from 'pokeapi-types';
import PaginationGroup from '../components/PaginationGroup';

interface Props {
  data: PokeAPI.NamedAPIResourceList;
}

export default function Home({ data }: Props) {
  return (
    <Box margin="6" data-testid="body">
      <PaginationGroup
        currentPage={1}
        nextPage={2}
        prevPage={0}
        limit={20}
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
            limit={20}
          ></PokemonCard>
        ))}
      </Grid>
      <PaginationGroup
        currentPage={1}
        nextPage={2}
        prevPage={0}
        limit={20}
        total={data.count}
      ></PaginationGroup>
    </Box>
  );
  return;
}

// rendering the first page during build for better first load performance
export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};
