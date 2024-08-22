import sass from "./Button.module.scss";
import { Link } from "react-router-dom";
import { RoutesType } from "../../router";
import {
	ButtonHTMLAttributes,
	DetailedHTMLProps,
	FC,
	MouseEventHandler,
} from "react";

type Variant = "primary" | "secondary" | "delete";

const getStyles = ({
	variant,
	fullWidth,
}: {
	variant: Variant;
	fullWidth: boolean | undefined;
}) => {
	const styles: { [key in Variant]: string } = {
		primary: fullWidth ? sass.primaryFullWidth : sass.primary,
		secondary: fullWidth ? sass.secondaryFullWidth : sass.secondary,
		delete: fullWidth ? sass.deleteFullWidth : sass.delete,
	};

	return styles[variant];
};

type ButtonProps = {
	text: string;
	to?: RoutesType;
	fullWidth?: boolean;
	variant?: Variant;
} & DetailedHTMLProps<
	ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>;

export const AccentButton: FC<ButtonProps> = ({
	text,
	to,
	variant = "primary",
	onClick,
	type = "button",
	fullWidth,
	disabled,
	ref,
	style,
}) => {
	return to === undefined ? (
		<button
			style={style}
			ref={ref}
			type={type}
			onClick={onClick as MouseEventHandler<HTMLButtonElement>}
			className={getStyles({ variant, fullWidth })}
			disabled={disabled}
		>
			{text}
		</button>
	) : (
		<Link
			onClick={onClick as unknown as MouseEventHandler<HTMLAnchorElement>}
			className={getStyles({ variant, fullWidth })}
			to={to}
		>
			{text}
		</Link>
	);
};
