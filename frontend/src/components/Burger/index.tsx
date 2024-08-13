import sass from "./Burger.module.scss";
import { FC } from "react";

type BurgerProps = {
	isOpen: boolean;
	onClick: () => void;
};

export const Burger: FC<BurgerProps> = ({ isOpen, onClick }) => {
	return (
		<div onClick={onClick} className={sass.menuLinkWrapper}>
			<div className={`${sass.menuLink} ${isOpen && sass.menuTriggerOpen}`}>
				<span className={sass.lines}></span>
			</div>
		</div>
	);
};
