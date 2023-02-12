import axios from "axios";
import { METADAT_URL } from "config";

export const getRarityOfTokenId = async (id: string) => {
	const res = await axios(`${METADAT_URL + id}.json`);
	console.log(res);
};
