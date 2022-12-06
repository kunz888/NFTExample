/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import React, { createContext, useState } from "react";
import { Contract } from "ethers";

// Import Smart Contract
import { getContract } from "./toolsFunctions/getContract";

// Je dois importer l'ABI du contract avec lequel je veux communiquer
// Pour ca, je vais la chercher dans le dossier artifact d'hardhat
// Pour des contracts externe les ABI sont souvent trouvable sur internet / etherscan
import contractAbi from "./abi/NftExample.json";
const contractAddress = "0x9BC8872FE812eF59cC6Ea2E14C9Ae5E17e00912A";

// Je cree une enum qui va me permettre de stocker les differents etat de connexion
// de mon utilisateur pour mieux me situer dans mon workflow
export enum MetamaskState {
  CONNECTING,
  METAMASK_MISSING,
  NOT_CONNECTED,
  BAD_NETWORK,
  CONNECTED,
}

// Ceci est une specificiter typescript
// Je cree une interface qui va contenir les champs qui vont apparaitre dans mon context
interface Web3ContextInterface {
  metamaskState: MetamaskState;
  userAccount: null | string;
  contract: null | Contract | undefined;
  attachContract?: () => void;
  setUserAccount?: (value: any) => void;
  setMetamaskState?: (value: any) => void;
  choosed: any; // Est utiliser dans l'exemple des components `card`
  setChoosed?:any; // Un setter pour changer la variable associee
}

// Quand je vais cree mon context, je vais devoir lui donner une valeur par defaut pour mes champs
// Obligatoire (ceux qui n'ont pas de `?` dans mon interface)
// Je cree donc un object par defaut.
export const Web3ContextContent: Web3ContextInterface = {
  userAccount: null,
  contract: null,
  choosed: 'none',
  metamaskState: MetamaskState.METAMASK_MISSING,
};

// J'utilise createContext avec en parametre mes valeurs par defaut et je lui renseigne
// entre chevron<> l'interface que mon type va implementer.
// eslint-disable-next-line prettier/prettier
export const Web3Context =
  createContext<Web3ContextInterface>(Web3ContextContent);


// En plus de mon context, je dois definir un provider, il s'agit d'un component react qui
// va venir englober toutes mon application comme le fait chakra ou notre router.
// Je recois en parametre tout les composants react enfant que je pourrai avoir dans mon application
export const Web3ContextProvider = ({ children }: any) => {
  // Toutes ces declarations sont la facon qu'utilise react pour stocker des variables
  // Vous pouvez mettre les valeurs que vous voulez a l'interrieur (object, file, variable, ...)
  const [userAccount, setUserAccount] = useState(
    Web3ContextContent.userAccount
  );
  const [metamaskState, setMetamaskState] = useState(
    Web3ContextContent.metamaskState
  );
  const [contract, setContract] = useState<any>(Web3ContextContent.contract)
	const [choosed, setChoosed] = useState<any>(Web3ContextContent.choosed)
  // const [nomVariable, setNomVariable] = useState<le type>(la valeur par default)

  // A la difference du folder LiveCoding, j'ai mis la fonction pour attacher un contract directement dans mon provider
  // Pour gagner en lisibilite sur mes components.
  const attachContract = (): void => {
    // La fonction getContract se trouve dans src/context/toolsFunctions/getContract.tsx
    setContract(getContract(contractAddress, contractAbi));
  };

  // Pour finaliser le context, donne a notre component en valeur de retour, notre context cree
  // Quelques lignes plus haut, et on le remplis avec les variables et fonction que nous souhaitons exposer
  // a toutes notre application
  // et pour finir un place children (les composants qu'on englode) entre nos balise de context
  return (
    <Web3Context.Provider
      value={{
        userAccount,
        setUserAccount,
        metamaskState,
        setMetamaskState,
        contract,
        attachContract,
        choosed,
			  setChoosed
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
