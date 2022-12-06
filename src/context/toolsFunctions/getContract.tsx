/* eslint-disable prettier/prettier */
import { Contract, ethers } from "ethers";
import React from "react";

// Je recois en parametre l'address du contract avec lequel je veux communiquer ainsi que sont abi
export const getContract = (
  contractAddress: string,
  contractAbi: any
): Contract | null | undefined => {
  if (typeof window !== "undefined") {
    // You now have access to `window`
    // Je recupere l'objet ethereum qui proviens de mon navigateur.
    // Il s'agit d'un objet me permettant de communiquer avec Metamask
    const { ethereum } = window as any;

    // Si je ne trouve pas l'object ethereum, c'est que metamask n'est pas present
    if (!ethereum) {
      console.error(
        "Could not get connected contract: ethereum object does not exist!"
      );
      return null;
    }

    // La premiere etape est de recuperer un provider. Il s'agit d'un service de communication
    // fournis pas un service tier qui detient votre cles prive pour communiquer a votre place et
    // garder cette derniere securiser
    // Ici j'appel `Web3Provider` qui fait reference a toutes les extensions web3 (metamask, phantom, ...)
    const provider = new ethers.providers.Web3Provider(ethereum);

    // Depuis mon provider, je veux recuperer un compte qui est actif dans le provider.
    // Par exemple, pour metamask, il s'agit du compte qui est selectionner lors de votre connexion au site
    const signer = provider.getSigner();

    // Une fois que j'ai tout les elements, je peux cree une instance de mon contract pour communiquer avec
    // Je dois fournir l'adress de mon contract (attention au reseau), mon abi et mon signer
    return new ethers.Contract(
      contractAddress as string,
      contractAbi.abi,
      signer
    );
  }
};
