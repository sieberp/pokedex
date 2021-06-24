import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div>
      <header>
        <h1> Navigation</h1>
      </header>
      {children}
      <footer>this is the footer</footer>
    </div>
  );
}
