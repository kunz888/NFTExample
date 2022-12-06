/* eslint-disable prettier/prettier */
import { useContext, useEffect, useState } from "react";
import { Text, Box } from '@chakra-ui/react';
import { MetamaskState, Web3Context } from "../context/web3Context";
import isConnectedOn from '../context/toolsFunctions/isConnectedOn';



function AccountId() {
    const web3Context = useContext(Web3Context);
    const [AccountLoad, setAccountLoad] = useState(false);
  
    // Cette fonction permet de demander a metamask de nous connecter un compte en envoyer une
    // popup a l'utilisateur.
    // Pour communiquer avec Metamask on utilise un protocol qui s'appelle le JRPC (on envoie no
    // requete au format JSON).
    //----
    // Cette fonction prend un parametre requestToUser qui s'il n'est pas specifier vaux false par default
    // Si requestToUser est vrai, l'appel a metask sera different et obligera le user a confirmer la connexion avec une
    // pop-up
    const askForMetamask = async (requestToUser = false) => {
      // Je regarde si les fonctions que je vais utiliser depuis mon context exsitent bien
      // Je dois faire ca, car j'ai typer mon context comparer a LiveCoding ou tout est specifier en any
      if (!web3Context.setUserAccount || !web3Context.setMetamaskState) return;
  
      // Je met mon load a true pour dire que je commence la phase de connexion
      // a noter que je n'utilise pas mon loader, mais je pourrai afficher un spinner a l'ecran s'il vaux true
      setAccountLoad(true);
      // Je dis a mon context que je suis en cours de connexion
      web3Context.setMetamaskState(MetamaskState.CONNECTING);
      try {
        // Soit je recupere un compte soit je force une fenetre de connexion a l'utilisateur pour lui demander la connexion
        const accounts = await (window as any).ethereum.request({
          method: requestToUser ? "eth_requestAccounts" : "eth_accounts",
        });
        if (accounts.length > 0) {
          // Si je recois plus de 1 accounts c'est que l'utilisateur c'est bien connecter
  
          // J'utilise la fonction is connectedOn pour specifier a mon utilisateur une chain sur lequel je l'attend
          // par exemple "0x01" pour ethereum.
  
          if (await isConnectedOn("any")) {
            // je sauvegarde son address dans la variable user de mon context.
            web3Context.setUserAccount(accounts[0]);
            web3Context.setMetamaskState(MetamaskState.CONNECTED);
           
           
          } else {
            // L'utilisateur s'est tromper de chain, je pourrai afficher un message d'erreur adequat en me basant sur le
            // metamaskState
            web3Context.setMetamaskState(MetamaskState.BAD_NETWORK);
            web3Context.setUserAccount(null);
          }
        } else {
          // Je n'ai recu aucun compte, cela veux dire que l'utilisateur ne s'est connecte
          web3Context.setMetamaskState(MetamaskState.NOT_CONNECTED);
          web3Context.setUserAccount(null);
        }
      } catch (e) {
        // Il y a une erreur avec metamask au cours de la connexion, donc je catch l'erreur
        web3Context.setMetamaskState(MetamaskState.NOT_CONNECTED);
        web3Context.setUserAccount(null);
      }
      setAccountLoad(false);
    };
  
    // Le useEffect est ce qu'on appel un Hook
    // Il s'execute a chaque fois que la page est rafraichi et quand elle est charge pour la premiere
    // fois.
    //---
    // Ce use effect va chercher dans l'object `window` de notre navigateur si un objet s'appel
    // 'Ethereum'. si c'est la cas, cela veux dire que metamask est present.
    useEffect(() => {
      if (!web3Context.setMetamaskState || !web3Context.setUserAccount) return;
  
      if (typeof (window as any).ethereum === "undefined") {
        web3Context.setMetamaskState(MetamaskState.METAMASK_MISSING);
        web3Context.setUserAccount(null);
      } else {
        // Je cree deux event dans mon navigateur, si jamais le user change de compte sur metamask, je le connecte
        // Avec le nouveau compte qu'il viens de selectionner, de meme s'il change de chain sur metamask
        (window as any).ethereum.on("accountsChanged", () => {
          askForMetamask(false);
        });
        (window as any).ethereum.on("chainChanged", () => {
          
        });
        askForMetamask();
      }
    }, []);
  
  
   
	return (
		<Box>
			  {web3Context.metamaskState === MetamaskState.CONNECTED ? (
          <text>  {web3Context.userAccount &&
            web3Context.userAccount.substring(0, 12).concat("...")}</text>
      
       
    
           
     ) : (
    
      <text>  {web3Context.userAccount &&
        web3Context.userAccount.substring(0, 12).concat("...")}</text>
     )}
 
 
		</Box>
	);
}

export default AccountId;