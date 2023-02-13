import { ABI_NFT, NFT_CONTRACT } from "config";
import { initialContractNft } from "./initialContract";
import Web3 from "web3";
const { contractNft, web3Nft } = initialContractNft();

export const getMyTokens = async (address: string) => {
	if (contractNft && web3Nft) {
		try {
			const token = await contractNft.methods.getMyTokens(address).call();
			return token;
		} catch (error) {
			return;
		}
	}
	return;
};

export const getRarityOfTokenId = async (id?: string) => {
	if (contractNft && web3Nft) {
		try {
			const rarity = await contractNft.methods
				.rarityOfTokenId(id ?? 0)
				.call();
			return rarity;
		} catch (error) {
			return;
		}
	}
	return;
};

export const getTotalSupply = async () => {
	const web3 = new Web3(
		new Web3.providers.HttpProvider(
			"https://data-seed-prebsc-1-s1.binance.org:8545"
		)
	); // testnet
	// const web3 = new Web3(new Web3.providers.HttpProvider('https://bsc-dataseed1.binance.org:443')) // mainet
	const contractNft = new web3.eth.Contract(
		//@ts-ignore
		ABI_NFT,
		NFT_CONTRACT
	);
	try {
		const rarity = await contractNft.methods.totalSupply().call();
		return rarity;
	} catch (error) {
		return;
	}
	return;
};

export const mint = async (address: string, amount: number) => {
	if (contractNft && web3Nft) {
		try {
			const res = await contractNft.methods.mint(amount).send({
				from: address,
				value: web3Nft.utils.toWei(
					(amount * 0.005).toString(),
					"ether"
				),
			});
			return res;
		} catch (error) {
			return;
		}
	}
	return;
};
