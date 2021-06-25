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
  chakra,
  Flex,
  Tag,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Grid,
  Progress,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import Image from 'next/image';
import { GetServerSideProps } from 'next';
import Pokemon from '../../types/Pokemon';

interface Props {
  pokemon: Pokemon;
}

export default function PokemonPage({ pokemon }: Props) {
  const src = pokemon.sprites.front_default;
  return (
    <Grid
      width={{
        base: '95vw',
        md: '70vw',
      }}
      borderRadius="xl"
      margin="2rem auto"
      shadow="2xl"
      padding="6"
      gridTemplateAreas={{
        base: `"heading" "img" "type" "stats" "abilites" "moves"`,
        md: `"heading stats" "img stats" "type type" "abilites moves"`,
      }}
    >
      <Box>
        <Heading gridArea="heading">{pokemon.name.toUpperCase()}</Heading>
        <Heading as="h3" gridArea="heading" color="gray" size="md">
          #{pokemon.order}
        </Heading>
      </Box>
      {src ? (
        <Box gridArea="img">
          <Image src={src} alt={pokemon.name} width="200" height="200" />
        </Box>
      ) : (
        <Badge gridArea="img" colorScheme="red" margin="10">
          No picture available
        </Badge>
      )}
      <Flex gridArea="type" margin="6">
        {pokemon.types.map((item) => (
          <Tag key={item.type.name} colorScheme="teal" marginRight="3">
            {item.type.name}
          </Tag>
        ))}
      </Flex>
      <Grid
        templateColumns="repeat(auto-fill, minmax(90px, 1fr))"
        gap="3"
        padding="6"
        gridArea="stats"
      >
        {pokemon.stats.map((item) => (
          <Stat key={item.stat.name} width="100%">
            <StatLabel textTransform="uppercase">{item.stat.name}</StatLabel>
            <StatNumber>{item.base_stat}</StatNumber>
            <Progress
              value={item.base_stat}
              colorScheme="teal"
              size="sm"
            ></Progress>
          </Stat>
        ))}
      </Grid>
      <Accordion allowToggle gridArea="abilites">
        <AccordionItem>
          <AccordionButton _hover={{ background: 'teal.50' }}>
            Abilities
          </AccordionButton>
          <AccordionPanel>
            <UnorderedList fontSize="md">
              {pokemon.abilities.map((item) => (
                <ListItem key={item.ability.name} textTransform="capitalize">
                  {item.ability.name}
                </ListItem>
              ))}
            </UnorderedList>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Accordion allowToggle gridArea="moves">
        <AccordionItem>
          <AccordionButton _hover={{ background: 'teal.50' }}>
            Moves
          </AccordionButton>
          <AccordionPanel>
            <UnorderedList fontSize="md">
              {pokemon.moves.map((item) => (
                <ListItem
                  key={item.move.name}
                  textTransform="capitalize"
                  listStyleImage=">"
                >
                  {item.move.name}
                </ListItem>
              ))}
            </UnorderedList>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Grid>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
  const pokemon = await res.json();

  return { props: { pokemon } };
};
