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

// Example d'un Call pour Minter un NFT
// try {
//   const contract = web3Context.contract;
//   await contract.mint(amount, {
//     value: ethers.utils.parseEther(1.toString()),
//   });
//   setSuccess('Mint réussi !');
// } catch (e: any) {
//   console.log(e);
//   setSuccess(null);
//   setError('Erreur lors de l\'intéraction');
// }

const FindNFT = () => {
  // J'importe WebContext et useContext pour recuperer mon context et toutes ses valeurs/fonctions
  const web3Context = useContext(Web3Context);

  // Je stocker dans cette variable le resultat de ma requete web3
  const [nft, setNft] = useState<any>(null);

  // Je stock ici le contenu du formulaire que l'utilisateur va remplir
  const [getnftById, setgetnftById] = useState("");
  const [balance, setBalance] = useState<null | string>(null);
  // Avec cette notation, je vais mettre a jour le contenu de `getnftById` a chque fois que l'utilisateur
  // va changer le contenu present dans le formulaire. Cela permet de gerer dynamiquement ma variable dans le champs
  // de l'utilisateur.
  const getnftByIdOnChange = (e: any) => {
    setgetnftById(e.target.value);
  };

  const getnftByIdSubmit = async () => {
    // je regarde si j'ai bien un contract qui existe
    if (web3Context.contract == null) return;
console.log(web3Context.contract)
    // Fetch the data - je recupere le token Uri passer en parametre
    // Attention a bien faire des call asynchrone
    const res = await web3Context.contract.tokenURI(getnftById);
    console.log(getnftById)
    console.log('1 :'+res)
    const res2 = await web3Context.contract.balanceOf(web3Context.userAccount);
    console.log('2 :'+res2)
    setBalance(res2);
    // Process the data - J'ai quelques probleme d'URL sur mon contract, je dois donc adapter l'url que je recois
    // Cela ne sera pas necessaire pour votre contract
  /*  const tab = res.split("/");
    console.log(tab)
    tab[5] = tab[5].substring(8);
    console.log(tab[5])
    const processed = tab.join("/");
   console.log('5:'+processed)*/
    const query = await fetch(res);
  
    // Serve data - je recupere le .json de mon NFT et sauvegarde ses donner dans mon variable
    setNft(await query.json());
    console.log(nft);

  };

  return (
    <Center mt="96" boxShadow={"lg"} p={4}>
      <Stack>
        <Input
          value={getnftById}
          onChange={getnftByIdOnChange}
          placeholder="NFT Id"
        />
        {/* Ce formulaire met a jour en permanance la valeur de ma variable getnftById */}
        <Button
          colorScheme={"green"}
          onClick={async () => {
            await getnftByIdSubmit();
          }}
        >
          {/* Ce bouton me permet  d'appeler la fonction getnftByIdSubmit*/}
          Fetch
        </Button>
        {/* Si j'ai bien un valeur dans mon State NFT, alors je l'affiche avec son contenu */}
        {nft && (
          <Stack>
            <Image
              align={"center"}
              boxSize="200px"
              objectFit="cover"
              src={nft.image}
              alt="fetched nft"
            />
            <Text>Owner: {nft.name}</Text>
            <Text>description: {nft.description}</Text>
      
          </Stack>
        )}
  
      </Stack>
    </Center>
  );
};

export default FindNFT;
