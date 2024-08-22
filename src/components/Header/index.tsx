import sass from "./Header.module.scss";
import { FC } from "react";
import { useAppState } from "../../hooks";
import { Container, Logo, NavBar, ProfilePanel } from "../index";

export const Header: FC = () => {
	const { authenticate } = useAppState();

	return (
		<header className={sass.header}>
			<Container>
				<div className={sass.headerInner}>
					<Logo />
					{authenticate.isRefreshing ? (
						<p>Loading...</p>
					) : authenticate.isLoggedIn ? (
						<ProfilePanel />
					) : (
						<NavBar />
					)}
				</div>
			</Container>
		</header>
	);
};
