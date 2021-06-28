import React, { ReactNode } from 'react';
import { chakra, Heading } from '@chakra-ui/react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const PageContext = React.createContext(1);
  const [page, setPage]: [number, (a: number) => void] = React.useState();
  return (
    <PageContext.Provider value={page}>
      <chakra.header padding="6" shadow="xl">
        <Heading>
          <Link href="/">Pokedex</Link>
        </Heading>
      </chakra.header>
      {children}
    </PageContext.Provider>
  );
}
