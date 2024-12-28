import { Utilities } from "../d";

export const getUtilities = (utilities: Utilities | null) => {
	const accesUtilities: string[] = [];

	if (utilities !== null) {
		for (let key in utilities) {
			if (utilities[key] === true) {
				accesUtilities.push(key);
			}
		}
	}

	return accesUtilities;
};

export const formatUtilities = (utilities: string[]): Utilities => {
	const accesUtilities: Utilities = {};

	utilities.forEach((utility) => {
		accesUtilities[utility] = true;
	});

	return accesUtilities;
};
