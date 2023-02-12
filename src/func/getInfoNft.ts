import { initialContractNft } from "./initialContract";
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
