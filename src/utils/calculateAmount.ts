type CalculateAmountParams = {
	amount: number;
	commission?: number;
};

export const calculateAmount = ({
	amount,
	commission = 20,
}: CalculateAmountParams) => {
	const calcCommission = (amount * commission) / 100;

	return ((calcCommission + amount) * 100 * 100) / 100;
};
