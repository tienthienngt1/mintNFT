import { ABI_NFT, NFT_CONTRACT } from "config";
import { initialContractNft } from "./initialContract";
import Web3 from "web3";
const { contractNft, web3 } = initialContractNft();

export const getMyTokens = async (address: string) => {
	if (contractNft) {
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
	if (contractNft) {
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

export const getQtyOfMinter = async (address: string) => {
	if (contractNft) {
		try {
			const rarity = await contractNft.methods
				.publicSalesMinterToTokenQty(address)
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
	if (contractNft) {
		try {
			const res = await contractNft.methods.mint(amount).send({
				from: address,
				value: web3.utils.toWei((amount * 0.005).toString(), "ether"),
			});
			return res;
		} catch (error) {
			return;
		}
	}
	return;
};
