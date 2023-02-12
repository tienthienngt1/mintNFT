import { ABI_NFT, NFT_CONTRACT } from "config";
import Web3 from "web3";
declare var window: any;

export const initialContractNft = () => {
	if (window.ethereum) {
		const web3Nft = new Web3(window.ethereum);
		const contractNft = new web3Nft.eth.Contract(
			//@ts-ignore
			ABI_NFT,
			NFT_CONTRACT
		);
		return { contractNft, web3Nft };
	}
	return { contractNft: undefined, web3Nft: undefined };
};
