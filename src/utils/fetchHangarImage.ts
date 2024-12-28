import { Dispatch, SetStateAction } from "react";
import { getExtansionFile } from "./getExtansionFile";

export const fetchHangarImage = async (
	pathToImage: string,
	setIsLoadHangarImage: Dispatch<SetStateAction<boolean>>
) => {
	setIsLoadHangarImage(true);
	try {
		const response = await fetch(pathToImage);
		const blob = await response.blob();

		setIsLoadHangarImage(false);

		return new File([blob], pathToImage, {
			type: getExtansionFile(pathToImage),
		});
	} catch (error) {
		setIsLoadHangarImage(false);
		console.warn(error);
		return null;
	}
};
