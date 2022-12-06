/* eslint-disable prettier/prettier */
import React from "react";

const isConnectedOn = async (targetChain: string): Promise<boolean> => {
  // Je regarde si j'ai bien metamask d'installer sur mon navigateur
  if ((window as any).ethereum === undefined) {
    return false;
  }

  // Si je passe "any" en parametre de la fonction je ne cherche pas une chaine en particulier
  if (targetChain === "any") return true;

  // J'appel metamask pour savoir sur quel chain mon utilisateur est connecter sur metamask
  const currentChainId = await (window as any).ethereum.request({
    method: "eth_chainId",
  });

  // Je comparer la chain que j'exige dans mon fonction avec la source de mon utilisateur
  // Par exemple eth == chainId 0x01
  return currentChainId === targetChain;
};

export default isConnectedOn;
