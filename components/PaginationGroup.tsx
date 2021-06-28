import { Button, ButtonGroup, Text, Center } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';

interface Props {
  currentPage: number;
  prevPage: number;
  nextPage: number;
  limit: number;
  total: number;
}

export default function PaginationGroup({
  currentPage,
  prevPage,
  nextPage,
  limit,
  total,
}: Props) {
  const router = useRouter();
  return (
    <Center width="100%">
      <ButtonGroup margin="2rem 0" fontSize="xl">
        <Button
          colorScheme="gray"
          onClick={() => router.push(`/pokemons/${prevPage}`)}
          disabled={currentPage === 1}
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
          Page {currentPage} of {Math.floor(total / limit)}
        </Text>
        <Button
          colorScheme="gray"
          onClick={() => router.push(`/pokemons/${nextPage}`)}
          disabled={currentPage === Math.floor(total / limit)}
        >
          Next
        </Button>
      </ButtonGroup>
    </Center>
  );
}
