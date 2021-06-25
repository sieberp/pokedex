import { ReactNode } from 'react';
import { chakra, Heading } from '@chakra-ui/react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div>
      <chakra.header padding="6" shadow="xl">
        <Heading>
          <Link href="/">Pokedex</Link>
        </Heading>
      </chakra.header>
      {children}
    </div>
  );
}
