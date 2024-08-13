import sass from "./Title.module.scss";
import { TitleProps } from "../../d";
import { FC } from "react";

export const Title: FC<TitleProps> = ({ title }) => {
	return (
		<div className={sass.wrapper}>
			<h2 className={sass.title}>{title}</h2>
			<span className={sass.decorationLine} />
		</div>
	);
};
