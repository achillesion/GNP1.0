export const getPoint = (pathname: string) => {
	const splittedPathname = pathname.split("/");

	return splittedPathname[splittedPathname.length - 1];
};
