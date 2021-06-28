import { Button, ButtonGroup, Text, Center } from '@chakra-ui/react';
import { PokeAPI } from 'pokeapi-types';

interface Props {
  currentPage: number;
  prevPage: () => void;
  nextPage: () => void;
  pokemonList: PokeAPI.NamedAPIResourceList;
  limit: number;
}

export default function PaginationGroup({
  currentPage,
  prevPage,
  nextPage,
  pokemonList,
  limit,
}: Props) {
  return (
    <Center width="100%">
      <ButtonGroup margin="2rem 0" fontSize="xl">
        <Button
          colorScheme="gray"
          onClick={() => prevPage()}
          disabled={!pokemonList.previous}
        >
          Previous
        </Button>
        <Text
          margin="auto"
          padding={{ base: '0 0.5rem', md: '0 2rem' }}
          fontSize={{
            base: 'md',
            md: 'lg',
          }}
        >
          Page {currentPage} of {Math.floor(pokemonList.count / limit)}
        </Text>
        <Button
          colorScheme="gray"
          onClick={() => nextPage()}
          disabled={!pokemonList.next}
        >
          Next
        </Button>
      </ButtonGroup>
    </Center>
  );
}
