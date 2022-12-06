/* eslint-disable prettier/prettier */
import React, { useContext, useState } from "react";
import {
  Button,
  Center,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Web3Context } from "../context/web3Context";

const AttachToContract = () => {
  // J'importe mon text dans ce component
  const web3Context = useContext(Web3Context);

  // Je cree deux variables pour savoir si je suis connecter et recupere l'address de mon contract
  const [state, setState] = useState(false);
  const [address, setAddress] = useState("");

  const attach = async () => {
    // Je regarde si dans mon context la fonction attachcontract existe bien
    if (web3Context.attachContract == null) return;

    // J'appel attachContract pour faire la connection a mon contract NFT (La definition de cette fonction est dans
    // le dossier src/context/web3Context.tsx)
    web3Context.attachContract();

    // Si j'ai bien recuperer un contract, je le met dans mon context
    // Je pourrai aussi performer cette operation depuis le context
    if (web3Context.contract != null) {
      setState(true);
      setAddress(web3Context.contract.address);
    }
  };

  return (
    <Center mt="96" boxShadow={"lg"} p={4}>
      <Stack>
        <VStack>
          <Text>Connect to the contract</Text>
          <Text>Status: {state ? "Connected" : "Disconected"}</Text>
          <Text>Address: {address}</Text>
        </VStack>
        <Button
          colorScheme={"green"}
          onClick={async () => {
            await attach();
          }}
        >
          Attach
        </Button>
      </Stack>
    </Center>
  );
};

export default AttachToContract;
