export const sortArray = (arr?: string[]) => {
	return arr?.filter((a) => a !== "0")?.sort((a, b) => Number(a) - Number(b));
};
