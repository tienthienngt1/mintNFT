import { initialContractGame } from "./initialContract";

const { contractGame, web3 } = initialContractGame();

export const smallAttack = async (address: string, tokenId: string) => {
	if (contractGame) {
		try {
			const res = await contractGame.methods.smallAttack(tokenId).send({
				from: address,
			});
			return res;
		} catch (error) {
			return;
		}
	}
	return;
};

export const mediumAttack = async (address: string, tokenId: string) => {
	if (contractGame) {
		try {
			const res = await contractGame.methods.mediumAttack(tokenId).send({
				from: address,
			});
			return res;
		} catch (error) {
			return;
		}
	}
	return;
};

export const largeAttack = async (address: string, tokenId: string) => {
	if (contractGame) {
		try {
			const res = await contractGame.methods.largeAttack(tokenId).send({
				from: address,
			});
			return res;
		} catch (error) {
			return;
		}
	}
	return;
};

export const getTurn = async (tokenId: string) => {
	if (contractGame) {
		try {
			const turn = await contractGame.methods
				.getTurnOfToken(tokenId ?? 0)
				.call();
			return turn;
		} catch (error) {
			return;
		}
	}
	return;
};

export const getResult = async (tokenId: string) => {
	if (contractGame) {
		try {
			const turn = await contractGame.methods
				.resultLastOfToken(tokenId)
				.call();
			return turn;
		} catch (error) {
			return;
		}
	}
	return;
};

export const getValue = async (tokenId: string) => {
	if (contractGame) {
		try {
			const value = await contractGame.methods
				.profitLastOfToken(tokenId)
				.call();
			return web3.utils.fromWei(value, "gwei");
		} catch (error) {
			return;
		}
	}
	return;
};

export const getBalanceOfGame = async (address: string) => {
	if (contractGame) {
		try {
			const value = await contractGame.methods
				.balanceOfGame(address)
				.call();
			return web3.utils.fromWei(value, "gwei");
		} catch (error) {
			return;
		}
	}
	return;
};

export const withdrawGame = async (address: string) => {
	if (contractGame) {
		try {
			const res = await contractGame.methods.withdraw().send({
				from: address,
			});
			return res;
		} catch (error) {
			return;
		}
	}
	return;
};
