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

export default function PokemonCard({
  pokemon,
  currentPage,
  index,
  limit,
}: Props) {
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
        #{index + 1 + (currentPage - 1) * limit} {pokemon.name}
      </Heading>
      <Link href={`/pokemon/${pokemon.name}`} key={`${pokemon.name}-${index}`}>
        <Button as="a" colorScheme="teal">
          More information
        </Button>
      </Link>
    </Flex>
  );
}
