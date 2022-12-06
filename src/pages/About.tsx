/* eslint-disable prettier/prettier */
import { Center, Heading, Link, Text, VStack } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

import React from "react";

const About = () => (
  <Center mt="180">
    <VStack spacing="10px">
      <Heading id={"marketplace-app-homePage-title"}>Qui sommes nous ?</Heading>
      <Text fontSize="2xl" id={"marketplace-app-homePage-subTitle"}>
        Unleach blockchain
      </Text>

      <Link href={"/"}>
        <Button colorScheme="green">Vers main</Button>
      </Link>
    </VStack>
  </Center>
);
export default About;
