export const tempstampConvert = (tempstampt) => {
	const timestempSelected = `${tempstampt}000`;
	const ts = new Date(Number(timestempSelected));
	const strDate = ts.toLocaleString();

	return strDate
};
