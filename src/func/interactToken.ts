import { initialContractToken } from "./initialContract";

const { contractToken, web3 } = initialContractToken();

export const getBalance = async (address: string) => {
	if (contractToken) {
		try {
			const rarity = await contractToken.methods
				.balanceOf(address ?? 0)
				.call();
			return web3.utils.fromWei(rarity.toString(), "gwei");
		} catch (error) {
			return;
		}
	}
	return;
};
