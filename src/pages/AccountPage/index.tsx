import sass from "./AccountPage.module.scss";
import { FC, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAppState, useResize, useScroll } from "../../hooks";
import { Burger, Container } from "../../components";
import { AccountNavigation } from "./components";

export const AccountPage: FC = () => {
	const { entityController } = useAppState();
	useScroll(entityController.isOpenDeleteModal);
	const viewWidth = useResize();
	const isDesktop = viewWidth > 1200;

	const [open, setOpen] = useState(true);

	return (
		<div className={sass.wrapper}>
			<Container>
				<h1 className={sass.title}>My Account</h1>
				<div
					className={
						isDesktop ? sass.body : !open ? sass.bodyActive : sass.body
					}
				>
					<div
						className={
							isDesktop
								? sass.navigationActive
								: open
								? sass.navigationActive
								: sass.navigation
						}
					>
						<AccountNavigation />
					</div>
					<main className={sass.content}>
						<div className={sass.toggleNavBar}>
							<Burger onClick={() => setOpen((prev) => !prev)} isOpen={open} />
						</div>
						<Outlet />
					</main>
				</div>
			</Container>
		</div>
	);
};
