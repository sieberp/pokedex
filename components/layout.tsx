import React, { ReactNode } from 'react';
import { chakra, Heading, Button, useColorMode } from '@chakra-ui/react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <chakra.header padding="6" shadow="xl">
        <Heading justifyContent="space-between" display="flex">
          <Link href="/">Pokedex</Link>
          <Button
            colorScheme="whiteAlpha"
            color="black.400"
            borderColor="red"
            onClick={toggleColorMode}
          >
            Toggle Color Mode
          </Button>
        </Heading>
      </chakra.header>
      {children}
    </>
  );
}
