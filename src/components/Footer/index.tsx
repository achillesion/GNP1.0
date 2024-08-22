import sass from "./Footer.module.scss";
import { Logo } from "../Logo";
import { FC } from "react";

type FooterVariant = "white" | "gray";

type FooterProps = {
	variant: FooterVariant;
};

const getStyles = (variant: FooterVariant) => {
	const styles: { [key in FooterVariant]: string } = {
		gray: sass.footerGray,
		white: sass.footerWhite,
	};

	return styles[variant];
};

export const Footer: FC<FooterProps> = ({ variant }) => {
	return (
		<footer className={getStyles(variant)}>
			<div className={sass.footerInner}>
				<Logo isDark />
				<span className={sass.decorationLine} />
				<p className={sass.copy}>
					Copyright &copy; 2024 Good Night Planes Company. All rights reserved.
				</p>
			</div>
		</footer>
	);
};
