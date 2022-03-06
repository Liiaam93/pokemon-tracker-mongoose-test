import "../css/style.css";
import "../css/form.css";
import Head from "next/head";
import Link from "next/link";
import { ChakraProvider } from "@chakra-ui/react";

import { Stack, HStack, VStack, Text, Button, Box } from "@chakra-ui/react";
import NextLink from "next/link";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Pokemon App</title>
      </Head>
      <HStack
        p="5"
        bg={"gray"}
        fontFamily="monospace"
        fontSize={"20"}
        spacing="24px"
      >
        <Box w="20%">
          <NextLink href="/" passHref>
            <Link>Home</Link>
          </NextLink>
        </Box>
        <Box w="20%">
          <NextLink href="/new" passHref>
            <Link>Add Pokemon</Link>
          </NextLink>
        </Box>
      </HStack>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
