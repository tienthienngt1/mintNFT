import { initialContractFaucet } from "./initialContract";

const { contractFaucet } = initialContractFaucet();

export const faucet = async (address: string) => {
	if (contractFaucet) {
		try {
			const res = await contractFaucet.methods.faucetTest().send({
				from: address,
			});
			console.log(res);

			return res;
		} catch (error) {
			console.log(error);
			return;
		}
	}
	return;
};
