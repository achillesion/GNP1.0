import sass from "./LoadingScreen.module.scss";
import { FC } from "react";
import { Loader } from "../Loader";

export const LoadingScreen: FC = () => {
	return (
		<div className={sass.screen}>
			<Loader size={100} />
		</div>
	);
};
