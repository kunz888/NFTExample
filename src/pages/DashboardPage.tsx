/* eslint-disable prettier/prettier */
import { Heading, Text, Center, VStack, Button } from '@chakra-ui/react';
import { Link } from '@chakra-ui/react';
import {  MetamaskState, Web3Context } from "../context/web3Context";
import { useContext,useState} from "react";
import React from 'react';
import AccountId from '../components/accountId';
import AttachToContract from "../components/attachToContract";
import FindNFT from "../components/findNft";
import MintBtn from "../components/MintBtn";
import CardLists from "../components/CardLists";

const DashboardPage = () => (
	
	<Center mt="50">
		<VStack spacing="10px">
			<Heading id={'marketplace-app-dashboardPage-title'}>Mon Dashboard</Heading>
			<Text fontSize="2xl" id={'marketplace-app-dashboardPage-subTitle'}>
				Mes NFT
			</Text>
			<AccountId/>
			<AttachToContract />
			<FindNFT />
			<CardLists/>
			<MintBtn/>
		</VStack>
	</Center>
);
export default DashboardPage;