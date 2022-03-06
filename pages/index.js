import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import Pokemon from "../models/Pokemon";
import {
  Stack,
  HStack,
  VStack,
  Text,
  Button,
  Box,
  Image,
  Flex,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

const Index = ({ pokemons }) => (
  <>
    <Flex>
      {/* Create a card for each pokemon */}
      {pokemons.map((pokemon) => (
        <Flex p="5px" key={pokemon._id}>
          <Flex
            p="2"
            border={"solid black 2px"}
            flexDir={"column"}
            bg={"gold"}
            borderRadius={"20"}
            alignItems="center"
          >
            <VStack bg={"teal"} borderRadius="20%" w="100%">
              <Text pt="2" color={"white"} position="fixed">
                {pokemon.shadow && "Shadow"} {pokemon.name}{" "}
              </Text>
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  pokemon.shiny ? "shiny/" : ""
                }${pokemon.dexNo}.png`}
              />
              <Text color="white">Rank #{pokemon.rank}</Text>
            </VStack>
            <Text>{pokemon.league}</Text>
            <Text>{pokemon.fastMove}</Text>
            <UnorderedList>
              {pokemon.chargedMoves
                .toString()
                .split(",")
                .map((data, index) => (
                  <ListItem key={index}>{data} </ListItem>
                ))}
            </UnorderedList>
            <Box alignSelf={"baseline"}>
              <Link href="/[id]/edit" as={`/${pokemon._id}/edit`}>
                <Button m="5px">Edit</Button>
              </Link>
              <Link href="/[id]" as={`/${pokemon._id}`}>
                <Button m="5px">View</Button>
              </Link>
            </Box>
          </Flex>
        </Flex>
      ))}
    </Flex>
  </>
);

/* Retrieves pokemons data from mongodb database */
export async function getServerSideProps() {
  await dbConnect();

  /* find all the data in our database */
  const result = await Pokemon.find({});
  const pokemons = result.map((doc) => {
    const pokemon = doc.toObject();
    pokemon._id = pokemon._id.toString();
    return pokemon;
  });

  return { props: { pokemons: pokemons } };
}

export default Index;
