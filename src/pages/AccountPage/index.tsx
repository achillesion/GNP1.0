import sass from "./AccountPage.module.scss";
import { FC, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAppState, useResize, useScroll } from "../../hooks";
import { Burger, Container } from "../../components";
import { AccountNavigation } from "./components";
import { GNPRoutes } from "../../router";
import { getPoint } from "../../utils";

export const AccountPage: FC = () => {
  const { entityController } = useAppState();
  useScroll(entityController.isOpenDeleteModal);
  const viewWidth = useResize();
  const isDesktop = viewWidth > 1200;
  const isMobile = viewWidth < 768;

  const { pathname } = useLocation();
  const point = getPoint(pathname);

  const [open, setOpen] = useState(true);

  return (
    <div className={sass.wrapper}>
      <Container>
        <h1 className={sass.title}>
          {point === GNPRoutes.chat
            ? isMobile
              ? "Chats"
              : "My Account"
            : "My Account"}
        </h1>
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
            {point !== GNPRoutes.chat && (
              <div className={sass.toggleNavBar}>
                <Burger
                  onClick={() => setOpen((prev) => !prev)}
                  isOpen={open}
                />
              </div>
            )}
            <Outlet />
          </main>
        </div>
      </Container>
    </div>
  );
};
