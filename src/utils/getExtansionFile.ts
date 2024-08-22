export const getExtansionFile = (fileName?: string | null) => {
	if (!fileName) return "";

	const spliitedFileName = fileName.split(".");

	return "image/" + spliitedFileName[spliitedFileName.length - 1];
};
