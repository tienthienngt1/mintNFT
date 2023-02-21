import {
	GAME_ABI,
	NFT_ABI,
	TOKEN_ABI,
	GAME_CONTRACT,
	NFT_CONTRACT,
	TOKEN_CONTRACT,
} from "config";
import Web3 from "web3";
declare var window: any;

const web3Func = () => {
	let web3js;
	if (window.ethereum) {
		web3js = new Web3(window.ethereum);
	} else {
		web3js = undefined;
	}
	return web3js;
};

export const initialContractNft = () => {
	const web3 = web3Func();
	if (web3) {
		const contractNft = new web3.eth.Contract(
			//@ts-ignore
			NFT_ABI,
			NFT_CONTRACT
		);
		return { contractNft, web3 };
	}
	return { contractNft: undefined, web3 };
};
export const initialContractGame = () => {
	const web3 = web3Func();
	if (web3) {
		const contractGame = new web3.eth.Contract(
			//@ts-ignore
			GAME_ABI,
			GAME_CONTRACT
		);
		return { contractGame, web3 };
	}
	return { contractGame: undefined, web3 };
};
export const initialContractToken = () => {
	const web3 = web3Func();
	if (web3) {
		const contractToken = new web3.eth.Contract(
			//@ts-ignore
			TOKEN_ABI,
			TOKEN_CONTRACT
		);
		return { contractToken, web3 };
	}
	return { contractToken: undefined, web3 };
};
