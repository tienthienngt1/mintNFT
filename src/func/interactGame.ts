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

export const allNftListed = async () => {
	if (contractGame) {
		try {
			const price = await contractGame.methods.tokenIdListed().call();
			return price;
		} catch (error) {
			return;
		}
	}
	return;
};

export const allNftListedByPrice = async () => {
	if (contractGame) {
		try {
			const price = await contractGame.methods.priceListed().call();
			return price;
		} catch (error) {
			return;
		}
	}
	return;
};

export const isListByTokenId = async (tokenId: string) => {
	if (contractGame) {
		try {
			const bool = await contractGame.methods
				.isListByTokenId(tokenId)
				.call();
			return bool;
		} catch (error) {
			return;
		}
	}
	return;
};

export const tokenIdListedByOwner = async (address: string) => {
	if (contractGame) {
		try {
			const bool = await contractGame.methods
				.getAllOfToken(address)
				.call();
			return bool;
		} catch (error) {
			return;
		}
	}
	return;
};

export const getInfoTokenListed = async (tokenId: string) => {
	if (contractGame) {
		try {
			const value = await contractGame.methods
				.getInfoTokenListed(tokenId)
				.call();
			return value;
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

export const getNowOfToken = async (tokenId: string) => {
	if (contractGame) {
		try {
			const value = await contractGame.methods
				.getNowOfToken(tokenId)
				.call();
			return value;
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

export const sell = async (address: string, tokenId: string, price: string) => {
	if (contractGame) {
		try {
			const res = await contractGame.methods
				.sell(tokenId, web3.utils.toWei(price, "Gwei"))
				.send({
					from: address,
				});
			return res;
		} catch (error) {
			return;
		}
	}
	return;
};

export const cancel = async (address: string, tokenId: string) => {
	if (contractGame) {
		try {
			const res = await contractGame.methods.cancel(tokenId).send({
				from: address,
			});
			return res;
		} catch (error) {
			return;
		}
	}
	return;
};

export const buy = async (address: string, tokenId: string) => {
	if (contractGame) {
		try {
			const res = await contractGame.methods.buy(tokenId).send({
				from: address,
			});
			return res;
		} catch (error) {
			return;
		}
	}
	return;
};
