import sass from "./MainTitle.module.scss";
import { FC } from "react";

type MainTitleProps = {
	title: string;
};

export const MainTitle: FC<MainTitleProps> = ({ title }) => (
	<h1 aria-label={title} className={sass.title}>
		{title}
	</h1>
);
