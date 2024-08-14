import sass from "./AccountNavigation.module.scss";
import { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { GNPRoutes } from "../../../../router";
import {
	Aircraft,
	Hangars,
	Profile,
	Reservations,
	BillingPaymant,
	Chat,
} from "../../../../icons";

export const AccountNavigation: FC = () => {
	const { pathname } = useLocation();

	return (
		<nav className={sass.navigation}>
			<ul className={sass.navList}>
				<li className={sass.navItem}>
					<NavLink
						aria-label="Navigate to basic information profile"
						className={
							pathname.includes(GNPRoutes.basicInformation)
								? sass.navLinkActive
								: sass.navLink
						}
						to={GNPRoutes.basicInformation}
					>
						<Profile isActive={pathname.includes(GNPRoutes.basicInformation)} />
						<p className={sass.linkText}>Basic Information</p>
					</NavLink>
				</li>
				<li className={sass.navItem}>
					<NavLink
						aria-label="Navigate to aircraft page"
						className={
							pathname.includes(GNPRoutes.aircraft)
								? sass.navLinkActive
								: sass.navLink
						}
						to={GNPRoutes.aircraft}
					>
						<Aircraft isActive={pathname.includes(GNPRoutes.aircraft)} />
						<p className={sass.linkText}>Aircraft</p>
					</NavLink>
				</li>
				<li className={sass.navItem}>
					<NavLink
						aria-label="Navigate to hangars page"
						className={
							pathname.includes(GNPRoutes.hangars)
								? sass.navLinkActive
								: sass.navLink
						}
						to={GNPRoutes.hangars}
					>
						<Hangars isActive={pathname.includes(GNPRoutes.hangars)} />
						<p className={sass.linkText}>Hangars</p>
					</NavLink>
				</li>
				<li className={sass.navItem}>
					<NavLink
						aria-label="Navigate to reservations page"
						className={
							pathname.includes(GNPRoutes.reservations)
								? sass.navLinkActive
								: sass.navLink
						}
						to={GNPRoutes.reservations}
					>
						<Reservations
							isActive={pathname.includes(GNPRoutes.reservations)}
						/>
						<p className={sass.linkText}>Reservations</p>
					</NavLink>
				</li>
				<li className={sass.navItem}>
					<NavLink
						aria-label="Navigate to payment information page"
						className={
							pathname.includes(GNPRoutes.billingPaymentInfo)
								? sass.navLinkActive
								: sass.navLink
						}
						to={GNPRoutes.billingPaymentInfo}
					>
						<BillingPaymant
							isActive={pathname.includes(GNPRoutes.billingPaymentInfo)}
						/>
						<p className={sass.linkText}>Billing & Payment Info</p>
					</NavLink>
				</li>
				<li className={sass.navItem}>
					<NavLink
						aria-label="Navigate to chat page"
						className={
							pathname.includes(GNPRoutes.chat)
								? sass.navLinkActive
								: sass.navLink
						}
						to={GNPRoutes.chat}
					>
						<Chat
							isActive={pathname.includes(GNPRoutes.chat)}
						/>
						<p className={sass.linkText}>Chat</p>
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};
