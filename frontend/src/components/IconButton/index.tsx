import sass from "./IconButton.module.scss";
import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";

type ButtonAddProps = {
	text: string;
	icon: JSX.Element;
} & DetailedHTMLProps<
	ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>;

export const IconButton: FC<ButtonAddProps> = ({
	text,
	onClick,
	icon,
	style,
	type = "button",
}) => {
	return (
		<button type={type} style={style} className={sass.button} onClick={onClick}>
			{icon}
			{text}
		</button>
	);
};
