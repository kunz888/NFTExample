/* eslint-disable prettier/prettier */
import { Heading, Text, Center, VStack, Button } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";

import React from "react";

import AskForMetamask from "../components/connectWithMetamask";
import AttachToContract from "../components/attachToContract";
;

const HomePage = () => (

  <Center mt="180">
    <VStack spacing="10px">
      <Heading id={"marketplace-app-homePage-title"}>My markeplace</Heading>
      <Text fontSize="2xl" id={"marketplace-app-homePage-subTitle"}>
       
      </Text>

      <Link href={"/about"}>
        <Button colorScheme="blue">Vers About</Button>
      </Link>
      <AskForMetamask />
	

    </VStack>
  </Center>
);
export default HomePage;
