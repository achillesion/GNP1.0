import { useEffect } from "react";

export const useScroll = (isNoScroll: boolean) => {
	useEffect(() => {
		if (isNoScroll) {
			document.body.classList.add("no-scroll");
		} else {
			document.body.classList.remove("no-scroll");
		}

		return () => {
			document.body.classList.remove("no-scroll");
		};
	}, [isNoScroll]);
};
