import { Flex, Heading, Button } from '@chakra-ui/react';
import Link from 'next/link';

interface Props {
  pokemon: {
    name: string;
    url: string;
  };
  currentPage: number;
  index: number;
  limit: number;
}

export default function PokemonCard({ pokemon, index }: Props) {
  return (
    <Flex
      borderRadius="lg"
      shadow="lg"
      padding="6"
      height="250px"
      justifyContent="space-between"
      flexDirection="column"
    >
      <Heading style={{ textTransform: 'capitalize' }} marginBottom="3">
        {pokemon.name}
      </Heading>
      <Link
        href={`/pokemon/${pokemon.name}`}
        key={`${pokemon.name}-${index}`}
        passHref
      >
        <Button as="a" colorScheme="teal">
          More information
        </Button>
      </Link>
    </Flex>
  );
}
