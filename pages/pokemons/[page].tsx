import React from 'react';
import {
  Grid,
  Button,
  ButtonGroup,
  Box,
  Divider,
  Text,
} from '@chakra-ui/react';
import { GetServerSideProps, GetStaticProps } from 'next';
import PokemonCard from '../../components/PokemonCard';
import { PokeAPI } from 'pokeapi-types';
import PaginationGroup from '../../components/PaginationGroup';
import { useRouter } from 'next/dist/client/router';

interface Props {
  data: PokeAPI.NamedAPIResourceList;
}

export default function PokemonListPage({ data }: Props) {
  const { query } = useRouter();
  // value of page is a string so we need to convert it to a number
  const currentPage: number = parseInt(query.page);
  const limit = 20;

  if (currentPage > Math.floor(data.count / limit)) {
    return <h1>Not found</h1>;
  }
  return (
    <Box margin="6" data-testid="body">
      <PaginationGroup
        currentPage={currentPage}
        nextPage={currentPage + 1}
        prevPage={currentPage - 1}
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
        nextPage={currentPage + 1}
        prevPage={currentPage - 1}
        limit={limit}
        total={data.count}
      ></PaginationGroup>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const page = parseInt(params.page);
  let res;
  if (page === 1) {
    res = await fetch(`https://pokeapi.co/api/v2/pokemon`);
  } else {
    res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${page * 20}&limit=20`
    );
  }

  const data = await res.json();

  console.log(data);

  return {
    props: {
      data,
    },
  };
};
