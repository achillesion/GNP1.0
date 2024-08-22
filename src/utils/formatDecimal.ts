export const formatDecimal = (num: number) => {
	const roundedNum = Math.round(num * 10) / 10;
	return roundedNum.toFixed(1);
};
