import {
  Box,
  Badge,
  Heading,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import Image from 'next/image';
import { GetServerSideProps } from 'next';

interface Props {
  pokemon: {
    abilities?: {
      ability: {
        name: string;
        url: string;
      };
    }[];
    name: string;
    order: number;
    types: {
      slot: number;
      type: {
        name: string;
      };
    }[];
    sprites?: {
      front_default?: string;
    };
    moves?: {
      move: {
        name: string;
        url: string;
      };
    }[];
    stats?: {
      base_stat: number;
      effort: number;
      stat: {
        name: string;
        url: string;
      };
    }[];
  };
}

export default function PokemonPage({ pokemon }: Props) {
  const src = pokemon.sprites.front_default;
  return (
    <Box
      width="70vw"
      borderRadius="xl"
      margin="2rem auto"
      shadow="2xl"
      padding="6"
    >
      <Heading>{pokemon.name.toUpperCase()}</Heading>
      {src ? (
        <Image src={src} alt={pokemon.name} width="200" height="200"></Image>
      ) : (
        <Badge colorScheme="red">No picture available</Badge>
      )}

      <Accordion allowToggle>
        <AccordionItem>
          <AccordionButton>Abilities</AccordionButton>
          <AccordionPanel>
            <Text fontSize="md">
              {pokemon.abilities.map((item) => (
                <li key={item.ability.name}>{item.ability.name}</li>
              ))}
            </Text>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>Moves</AccordionButton>
          <AccordionPanel>
            <Text fontSize="md">
              {pokemon.moves.map((item) => (
                <li key={item.move.name}>{item.move.name}</li>
              ))}
            </Text>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>Types</AccordionButton>
          <AccordionPanel>
            <Text fontSize="md">
              Types:
              {pokemon.types.map((item) => (
                <li key={item.type.name}>{item.type.name}</li>
              ))}
            </Text>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>Stats</AccordionButton>
          <AccordionPanel>
            <Text fontSize="md">
              Stats:
              {pokemon.stats.map((item) => (
                <li key={item.stat.name}>
                  {item.stat.name}: {item.base_stat}, {item.effort}
                </li>
              ))}
            </Text>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  console.log(params);
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
  const pokemon = await res.json();

  return { props: { pokemon } };
};
