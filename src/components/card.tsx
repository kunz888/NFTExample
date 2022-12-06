/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import {  Heading } from '@chakra-ui/react';
import { Web3Context } from '../context/web3Context';
import React, { useContext, useState } from "react";
import {
  Button,
  Center,
  Image,
  Input,
  Box,
  Text,
  HStack,
} from "@chakra-ui/react";

function Card(props: any) {
	const web3Context = useContext(Web3Context);

	return (

		<Box>	
		<Image
		  align={"center"}
		  boxSize="200px"
		  objectFit="cover"
		  src={props.data.image}
		  alt="fetched nft"
		/>
		<Text>Owner: {props.data.name}</Text>
		<Text>description: {props.data.description}</Text>
		</Box>

	);
}

export default Card;



