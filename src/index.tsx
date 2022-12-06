/* eslint-disable prettier/prettier */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import App from "./app/App";

import theme from "./theme";
import "./theme/index.css";

// J'importe notre provider pour lui faire englober notre application et rendre public les champs qu'il exporte
import { Web3ContextProvider } from "./context/web3Context";
ReactDOM.render(
	<React.StrictMode>
		<Web3ContextProvider>
			<ChakraProvider theme={theme} resetCSS>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</ChakraProvider>
		</Web3ContextProvider>
	</React.StrictMode>,
	document.getElementById("root"),
);
