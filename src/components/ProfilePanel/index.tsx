import sass from "./ProfilePanel.module.scss";
import { FC, useState } from "react";
import { Link, useLocation } from "react-router-dom";
// @ts-ignore
import { Collapse } from "react-collapse";
import { getFirstLetterOfUserName } from "../../utils";
import { DropArrow } from "../../icons";
import { MdAccountCircle } from "react-icons/md";
import { IoHome, IoLogOutOutline } from "react-icons/io5";
import { GNPRoutes } from "../../router";
import { useAppDispatch, useAppState } from "../../hooks";
import { logout } from "../../redux/store";

const { REACT_APP_IMAGE_BASIC_PATH } = process.env;

export const ProfilePanel: FC = () => {
  const { authenticate } = useAppState();
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();

  const [open, setOpen] = useState(false);

  const togglePanel = () => {
    setOpen((prev) => !prev);
  };

  const settingsIcons = {
    size: 30,
    color: "#fff",
  };

  return (
    <div className={sass.wrapper}>
      <button className={sass.profileButton} onClick={togglePanel}>
        {authenticate.user?.avatar ? (
          <div className={sass.preview}>
            <img
              className={sass.image}
              src={`${REACT_APP_IMAGE_BASIC_PATH}${authenticate.user.avatar}`}
              alt="preview"
            />
          </div>
        ) : (
          <span className={sass.avatar}>
            {getFirstLetterOfUserName(authenticate.user?.name || "")}
          </span>
        )}
        <p className={sass.userName}>{authenticate.user?.name}</p>
        <div className={open ? sass.iconActive : sass.icon}>
          <DropArrow />
        </div>
      </button>
      <Collapse isOpened={open}>
        {pathname !== GNPRoutes.home && (
          <Link
            onClick={togglePanel}
            className={sass.navLink}
            to={GNPRoutes.home}
          >
            <IoHome size={settingsIcons.size} color={settingsIcons.color} />
            <p className={sass.navText}>Home</p>
          </Link>
        )}
        <Link
          onClick={togglePanel}
          className={sass.navLink}
          to={`${GNPRoutes.account}/${GNPRoutes.basicInformation}`}
        >
          <MdAccountCircle
            size={settingsIcons.size}
            color={settingsIcons.color}
          />
          <p className={sass.navText}>Account</p>
        </Link>
        <button className={sass.logout} onClick={() => dispatch(logout())}>
          <IoLogOutOutline
            size={settingsIcons.size}
            color={settingsIcons.color}
          />
          <p className={sass.navText}>Logout</p>
        </button>
      </Collapse>
    </div>
  );
};
