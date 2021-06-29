import { Center, Flex, Heading, Button } from '@chakra-ui/react';
import Link from 'next/link';
import Image from 'next/image';

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
  const id = pokemon.url.substring(34, pokemon.url.length - 1);
  return (
    <Flex
      borderRadius="lg"
      shadow="lg"
      padding="6"
      justifyContent="space-between"
      flexDirection="column"
    >
      <Heading textTransform="capitalize" marginBottom="3" textAlign="center">
        {pokemon.name}
      </Heading>
      <Center margin={3}>
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          width="100"
          height="100"
          alt={pokemon.name}
        ></Image>
      </Center>
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
