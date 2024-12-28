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
import { useResize } from "../../../../hooks";

export const AccountNavigation: FC = () => {
  const { pathname } = useLocation();

  const viewWidth = useResize();
  const isTabletOrMobile = viewWidth < 1200;

  function modifyPath(path: string) {
    return isTabletOrMobile ? `/account/${path}` : path;
  }

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
            to={modifyPath(GNPRoutes.basicInformation)}
          >
            <Profile isActive={pathname.includes(GNPRoutes.basicInformation)} />
            <p className={sass.linkText}>Profile</p>
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
            to={modifyPath(GNPRoutes.chat)}
          >
            <Chat isActive={pathname.includes(GNPRoutes.chat)} />
            <p className={sass.linkText}>Messages</p>
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
            to={modifyPath(GNPRoutes.billingPaymentInfo)}
          >
            <BillingPaymant
              isActive={pathname.includes(GNPRoutes.billingPaymentInfo)}
            />
            <p className={sass.linkText}>Billing</p>
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
            to={modifyPath(GNPRoutes.reservations)}
          >
            <Reservations
              isActive={pathname.includes(GNPRoutes.reservations)}
            />
            <p className={sass.linkText}>Reservation</p>
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
            to={modifyPath(GNPRoutes.aircraft)}
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
            to={modifyPath(GNPRoutes.hangars)}
          >
            <Hangars isActive={pathname.includes(GNPRoutes.hangars)} />
            <p className={sass.linkText}>Hangars</p>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
