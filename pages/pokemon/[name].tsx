import {
  Box,
  Badge,
  Button,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Flex,
  Tag,
  Stat,
  StatLabel,
  StatNumber,
  Grid,
  Progress,
  UnorderedList,
  ListItem,
  Text,
  Center,
} from '@chakra-ui/react';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { PokeAPI } from 'pokeapi-types';
import { useRouter } from 'next/dist/client/router';
import axios from 'axios';

interface Props {
  pokemon?: PokeAPI.Pokemon;
  evolutionNames?: string[] | string[][];
  errorCode: number;
  name: string;
}

export default function PokemonPage({
  pokemon,
  evolutionNames,
  errorCode,
  name,
}: Props) {
  const router = useRouter();
  if (errorCode) {
    return (
      <Center m={6} flexDir="column">
        <Head>
          <title>{name} does not exist</title>
        </Head>
        <Heading>The pokemon with name {name} does not exist</Heading>
        <Button onClick={() => router.back()} margin={6}>
          Go Back
        </Button>
      </Center>
    );
  } else {
    const src = pokemon.sprites.front_default;
    return (
      <>
        <Head>
          <title>Details of {pokemon.name.toUpperCase()}</title>
        </Head>
        <Button margin={6} onClick={() => router.back()}>
          Go Back
        </Button>
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
            base: `"heading" "img" "type" "stats" "abilites" "moves" "evolution"`,
            md: `"heading stats" "img stats" "type type" "abilites moves" "evolution evolution"`,
          }}
        >
          <Box>
            <Heading gridArea="heading">{pokemon.name.toUpperCase()}</Heading>
            <Heading
              as="h3"
              gridArea="heading"
              color="gray"
              size="md"
              data-testid="order-number"
            >
              Order #{pokemon.order}
            </Heading>
          </Box>
          {src ? (
            <Box gridArea="img" display="grid" justifyContent="center">
              <Image src={src} alt={pokemon.name} width="200" height="200" />
            </Box>
          ) : (
            <Badge
              gridArea="img"
              colorScheme="red"
              margin="10"
              data-testid="no-picture-info"
            >
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
              <Stat
                key={item.stat.name}
                width="100%"
                justifyContent="space-between"
              >
                <StatLabel textTransform="uppercase">
                  {item.stat.name}
                </StatLabel>
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
              <AccordionButton
                _hover={{ background: 'teal.50' }}
                id="accordion-button-abilities"
              >
                Abilities
              </AccordionButton>
              <AccordionPanel>
                <UnorderedList fontSize="md" data-testid="abilities-list">
                  {pokemon.abilities.map((item) => (
                    <ListItem
                      key={item.ability.name}
                      textTransform="capitalize"
                    >
                      {item.ability.name}
                    </ListItem>
                  ))}
                </UnorderedList>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <Accordion allowToggle gridArea="moves">
            <AccordionItem>
              <AccordionButton
                _hover={{ background: 'teal.50' }}
                id="accordion-button-moves"
              >
                Moves
              </AccordionButton>
              <AccordionPanel>
                <UnorderedList fontSize="md" data-testid="moves-list">
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
          <Box gridArea="evolution">
            <Heading as="h3" fontSize="2xl" marginTop="6" marginBottom="4">
              Evolution Line
            </Heading>
            {evolutionNames.map((evolutionLine, lineIndex) => {
              return (
                <UnorderedList
                  key={`${evolutionLine[0]}-${lineIndex}`}
                  listStyleType="none"
                  display="flex"
                  flexDirection="row"
                  marginLeft="0"
                >
                  {evolutionLine.map((pokemon, index) => {
                    return (
                      <ListItem key={`${pokemon}-${index}`} display="flex">
                        <Text
                          textTransform="capitalize"
                          fontSize={{ base: 'md', md: 'xl' }}
                          fontWeight="medium"
                          marginRight="3"
                          marginLeft="3"
                          cursor="pointer"
                          _hover={{
                            textDecoration: 'underline',
                          }}
                        >
                          <Link href={`/pokemon/${pokemon}`}>{pokemon}</Link>
                        </Text>
                        <Text fontSize={{ base: 'md', md: 'xl' }}>
                          {index + 1 < evolutionLine.length ? '>' : null}
                        </Text>
                      </ListItem>
                    );
                  })}
                </UnorderedList>
              );
            })}
          </Box>
        </Grid>
      </>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const pokemonRes = await axios(
    `https://pokeapi.co/api/v2/pokemon/${params.name}`
  );
  // if there is an error code return it to the page
  // name returned to give custom error page
  const errorCode = pokemonRes.status === 200 ? false : pokemonRes.status;
  if (errorCode) {
    return {
      props: {
        errorCode,
        name: params.name,
      },
    };
  }

  // get the data for the requested pokemon
  const pokemon: PokeAPI.Pokemon = pokemonRes.data;
  const pokemonDataRes = await axios(
    `https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}/`
  );
  const pokemonData: PokeAPI.PokemonSpecies = pokemonDataRes.data;

  // get the evolution data for the requested pokemon
  const evolutionRes = await axios(pokemonData.evolution_chain.url);
  const evolutionData: PokeAPI.EvolutionChain = evolutionRes.data;

  // in some cases there is more than one evolution chain
  let evolutionNames: string[][] & string[] = [];
  let evolutionChain = evolutionData.chain;

  let evolutionChainLength = evolutionChain.evolves_to.length;
  for (let i = 0; i < evolutionChainLength; i++) {
    var names: string[] = [];
    let evolutions = evolutionChain;
    // add all species to the array till the last level of evolution
    do {
      names.push(evolutions.species.name);
      evolutions = evolutions['evolves_to'][i];
    } while (!!evolutions && evolutions.hasOwnProperty('evolves_to'));
    evolutionNames.push(names);
  }

  return { props: { pokemon, evolutionNames } };
};
