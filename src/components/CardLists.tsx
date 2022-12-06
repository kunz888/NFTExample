/* eslint-disable prettier/prettier */

import {  Box } from '@chakra-ui/react';

import Card from './card';
import React, { useContext, useEffect, useState} from "react";
import {
  Text,HStack
} from "@chakra-ui/react";
import { Web3Context } from "../context/web3Context";


const CardLists= ()=> {
	const web3Context = useContext(Web3Context);
const [jsonArrayObject,SetjsonArrayObject]=useState<any>(null);
useEffect(()=>	{

	const fetchData = async () => {
	  // je regarde si j'ai bien un contract qui existe
	  if (web3Context.contract == null) return;
    //je recupere le nombre de nft
	const res2 = await web3Context.contract.balanceOf(web3Context.userAccount);
	console.log('nb nft :'+res2)

	  
    const nftData = [];
	  for (let index = 1; index <= res2; index++) {
		const resu = await web3Context.contract.tokenURI(index);
		console.log('1 :'+resu)
		const queryu = await fetch(resu);
		  // Serve data - je recupere le .json de mon NFT et sauvegarde ses donner dans mon variable
		 const currentNFT=await queryu.json();
		 nftData.push(currentNFT);
		console.log(currentNFT);
	  }	
	  SetjsonArrayObject(nftData);
	  console.log(nftData);

	
	}
	fetchData();
	});

	return (
		<>
		 <HStack spacing='24px'>
			{jsonArrayObject &&
				jsonArrayObject.map((el:any, idx:number) => (
						<Card data={el} />
				))
			}
	    </HStack>
		</>
	);
}

export default CardLists;



