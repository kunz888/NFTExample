/* eslint-disable prettier/prettier */
import React, { useContext, useState,useEffect } from "react";
import {
  Button,
  Center,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MetamaskState,Web3Context } from "../context/web3Context";

import { ethers } from "ethers";



const MintBtn = () => {
	const web3Context = useContext(Web3Context);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<null | string>(null);
	const [success, setSuccess] = useState<null | string>(null);
	const [balance, setBalance] = useState<null | string>(null);
	
	const callFunction = async () => {
		console.log(web3Context);
		if (!web3Context.contract  || !web3Context.userAccount) return;
		setLoading(true);
		console.log('before try');
		try {
			const contract = web3Context.contract;
			console.log(web3Context.userAccount);
			await contract.mintToken((web3Context.userAccount), {
				
				value:"2"
			});
			setSuccess('Congratulation! you are in.');
			const res2 = await web3Context.contract.balanceOf;
			console.log('1 :'+res2)
		
		} catch (e: any) {
			console.log(e);
			setSuccess(null);
			setError('You can not mint anymore');
			console.log('You can not mint anymore');
		}
		setLoading(false);
	};

	

	useEffect(() => {
	
		if (web3Context.metamaskState != MetamaskState.CONNECTED) {
			setError('You are not connected');
		} else {
			setError(null);
			setSuccess(null);
		}
	}, [web3Context.userAccount, web3Context.metamaskState]);

	return (
		<>
			<Button
				onClick={callFunction}
				disabled={loading || web3Context.metamaskState != MetamaskState.CONNECTED}
				w={'full'}
				mt={8}
				bg={'yellow.500'}
				color={'white'}
				rounded={'md'}
				_hover={{
					transform: 'translateY(-2px)',
					boxShadow: 'lg',
					bg: 'yellow.600',
				}}
			>
				Mint ( {2} wei)
			</Button>
			{error && (
				<Text textAlign={'center'} color={'red.400'}>
					{error}
				</Text>
			)}
			{success && (
				<Text textAlign={'center'} color={'green.400'}>
					{success}
				</Text>
			)}
		
		
			
		</>
	);
};

export default MintBtn;

