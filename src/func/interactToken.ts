import { NFT_CONTRACT } from "config";
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

export const allowance = async (address: string) => {
	if (contractToken) {
		try {
			const rarity = await contractToken.methods
				.allowance(address, NFT_CONTRACT)
				.call();
			return web3.utils.fromWei(rarity.toString(), "gwei");
		} catch (error) {
			return;
		}
	}
	return;
};

export const approve = async (amount: number, address: string) => {
	if (contractToken) {
		try {
			const balance = await getBalance(address);
			if (Number(balance) < amount * 10000) {
				return "Insufficient Token";
			}
			const allowanceAmount = await allowance(address);
			if (Number(allowanceAmount) >= amount * 10000) {
				return true;
			}
			await contractToken.methods
				.approve(
					NFT_CONTRACT,
					web3.utils.toWei((balance ?? 10000000).toString(), "gwei")
				)
				.send({
					from: address,
				});
			return true;
		} catch (error) {
			console.log(error);

			return;
		}
	}
	return;
};
