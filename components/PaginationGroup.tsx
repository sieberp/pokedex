import { Button, ButtonGroup, Text, Center } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';

interface Props {
  currentPage: number;
  limit: number;
  total: number;
}

export default function PaginationGroup({ currentPage, limit, total }: Props) {
  const router = useRouter();
  return (
    <Center width="100%">
      <ButtonGroup margin="2rem 0" fontSize="xl">
        <Button
          colorScheme="gray"
          onClick={() => router.push(`/pokemons/${currentPage - 1}`)}
          disabled={currentPage === 1}
          data-testid="prev-link"
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
          onClick={() => router.push(`/pokemons/${currentPage + 1}`)}
          disabled={currentPage === Math.floor(total / limit)}
          data-testid="next-link"
        >
          Next
        </Button>
      </ButtonGroup>
    </Center>
  );
}
