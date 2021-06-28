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
import { GetServerSideProps } from 'next';
import { PokeAPI } from 'pokeapi-types';
import { useRouter } from 'next/dist/client/router';

interface Props {
  pokemon?: PokeAPI.Pokemon;
  evolutionData?: PokeAPI.EvolutionChain;
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
      <Center mt="5rem">
        <Heading>The pokemon with name {name} does not exist</Heading>;
      </Center>
    );
  } else {
    const src = pokemon.sprites.front_default;
    return (
      <>
        <Button onClick={() => router.back()}>Go Back</Button>
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
            <Heading as="h3" gridArea="heading" color="gray" size="md">
              Order #{pokemon.order}
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
                <UnorderedList fontSize="md">
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
          <Box gridArea="evolution">
            <Heading as="h3" fontSize="2xl" marginTop="6" marginBottom="4">
              Evolution Line
            </Heading>
            {Array.isArray(evolutionNames[0]) ? (
              evolutionNames.map((evolutionLine, lineIndex) => {
                return (
                  <UnorderedList
                    listStyleType="none"
                    display="flex"
                    flexDirection="row"
                    marginLeft="0"
                    key={`${Math.random()}-${lineIndex}`}
                  >
                    {evolutionLine.map((pokemon, index) => {
                      return (
                        <>
                          <ListItem
                            textTransform="capitalize"
                            key={`${pokemon}-${lineIndex}`}
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
                          </ListItem>
                          <Text fontSize={{ base: 'md', md: 'xl' }}>
                            {index + 1 < evolutionLine.length ? '>' : null}
                          </Text>
                        </>
                      );
                    })}
                  </UnorderedList>
                );
              })
            ) : (
              <UnorderedList
                listStyleType="none"
                display="flex"
                flexDirection="row"
                marginLeft="0"
              >
                {evolutionNames.map((pokemon, index) => {
                  return (
                    <>
                      <ListItem
                        key={pokemon}
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
                      </ListItem>
                      <Text fontSize={{ base: 'md', md: 'xl' }}>
                        {index + 1 < evolutionNames.length ? '>' : null}
                      </Text>
                    </>
                  );
                })}
              </UnorderedList>
            )}
          </Box>
        </Grid>
      </>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  console.log(params);
  const pokemonRes = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${params.name}`
  );
  const errorCode = pokemonRes.ok ? false : pokemonRes.status;

  if (errorCode) {
    return {
      props: {
        errorCode,
        name: params.name,
      },
    };
  }
  const pokemon: PokeAPI.Pokemon = await pokemonRes.json();

  const pokemonDataRes = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}/`
  );
  const pokemonData: PokeAPI.PokemonSpecies = await pokemonDataRes.json();
  const evolutionRes = await fetch(pokemonData.evolution_chain.url);
  const evolutionData: PokeAPI.EvolutionChain = await evolutionRes.json();

  let evolutionNames: string[][] & string[] = [];
  let evolutionChain = evolutionData.chain;

  if (evolutionChain.evolves_to.length > 1) {
    let evolutionChainLength = evolutionChain.evolves_to.length;
    for (let i = 0; i < evolutionChainLength; i++) {
      var names: string[] = [];
      let evolutions = evolutionChain;
      console.log('evolutions' + evolutions);
      do {
        names.push(evolutions.species.name);
        evolutions = evolutions['evolves_to'][i];
      } while (!!evolutions && evolutions.hasOwnProperty('evolves_to'));
      console.log(evolutionNames);
      evolutionNames.push(names);
    }
  } else {
    do {
      evolutionNames.push(evolutionChain.species.name);
      evolutionChain = evolutionChain['evolves_to'][0];
    } while (!!evolutionChain && evolutionChain.hasOwnProperty('evolves_to'));
  }

  return { props: { pokemon, evolutionData, evolutionNames, errorCode } };
};
