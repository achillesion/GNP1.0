import sass from "./NavBar.module.scss";
import { FC } from "react";
import { Link } from "react-router-dom";
import { AccentButton } from "../index";
import { GNPRoutes } from "../../router";

export const NavBar: FC = () => {
	return (
		<nav className={sass.navBar}>
			<ul className={sass.navList}>
				<li className={sass.navItem}>
					<Link className={sass.link} to={GNPRoutes.signIn}>
						Log In
					</Link>
				</li>
				<li className={sass.navItem}>
					<AccentButton text="Sign Up" to={GNPRoutes.signUp} />
				</li>
			</ul>
		</nav>
	);
};
