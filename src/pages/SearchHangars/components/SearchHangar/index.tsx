import sass from "./SearchHangar.module.scss";
import { Dispatch, FC, SetStateAction, useState } from "react";
// @ts-ignore
import { Collapse } from "react-collapse";
import { Hangar } from "../../../../d";
import { DropArrow, Star } from "../../../../icons";
import { useAppDispatch, useAppState, useScroll } from "../../../../hooks";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GNPRoutes } from "../../../../router";
import { setRoute } from "../../../../redux/store";
import { formatDecimal } from "../../../../utils";

type SearchHangarProps = {
  hangar: Hangar;
  setCurrentHangar: Dispatch<SetStateAction<Hangar | null>>;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  isOpenModal: boolean;
};

const theme = {
  collapse: "hangar-collapse",
  content: "hangar-collapse--content",
};

const { REACT_APP_IMAGE_BASIC_PATH } = process.env;

export const SearchHangar: FC<SearchHangarProps> = ({
  hangar,
  setCurrentHangar,
  isOpenModal,
  setOpenModal,
}) => {
  const { authenticate } = useAppState();
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = useState<boolean>(false);
  const navigation = useNavigate();

  useScroll(isOpenModal);

  const handleClickReservation = () => {
    if (authenticate.isLoggedIn) {
      setOpenModal(true);
      setCurrentHangar(hangar);
    } else {
      toast.info("To make a reservation, you need to login.");
      navigation(GNPRoutes.signIn);
      dispatch(setRoute(GNPRoutes.searchHangars));
    }
  };

  return (
    <li className={expanded ? sass.hangarActive : sass.hangar}>
      <div className={sass.hangarInner}>
        <div className={sass.hangarImage}>
          <img
            width={170}
            height={170}
            src={`${REACT_APP_IMAGE_BASIC_PATH}${hangar.photo}`}
            alt=""
          />
        </div>
        <div className={sass.hangarInnerInfo}>
          <div className={sass.info}>
            <p className={sass.hangarTitle}>{hangar.title}</p>
            <p className={sass.rating}>
              <Star /> {formatDecimal(hangar.rating)}
            </p>
            <div className={sass.locationInfo}>
              <p className={sass.locationInfoText}>
                Airport Identifier:- <span>{hangar.airport.identifier}</span>
              </p>
            </div>
            <p className={sass.price}>${hangar.price} per night</p>
          </div>
          <div className={sass.actions}>
            <button
              onClick={handleClickReservation}
              className={sass.reservationButton}
            >
              Reserve Now
            </button>
            <button
              className={sass.expansiveButton}
              onClick={() => setExpanded((prev) => !prev)}
            >
              <p>{expanded ? "less info" : "more info"}</p>
              <div className={expanded ? sass.iconActive : sass.icon}>
                <DropArrow color="#6C6C6C" />
              </div>
            </button>
          </div>
        </div>
      </div>
      <Collapse theme={theme} isOpened={expanded}>
        <div className={sass.additionalInfo}>
          <div className={sass.description}>
            <div className={sass.text}>
              <p className={sass.descriptionTitle}>Description</p>
              <p className={sass.descriptionText}>{hangar.description}</p>
            </div>
            <div className={sass.tableInfo}>
              <div className={sass.tableInfoBlock}>
                <p className={sass.tableInfoTitle}>Hangar</p>

                <div className={sass.tableInfoItem}>
                  <p>Hangar Width</p>
                  <p>{hangar.width}'</p>
                </div>
                <div className={sass.tableInfoItem}>
                  <p>Hangar Depth</p>
                  <p>{hangar.length}'</p>
                </div>
                <div className={sass.tableInfoItem}>
                  <p>Door Type</p>
                  <p>{hangar.accessType}</p>
                </div>
                <div className={sass.tableInfoItem}>
                  <p>Door Height</p>
                  <p>{hangar.doorHeight}'</p>
                </div>
                <div className={sass.tableInfoItem}>
                  <p>Door Width</p>
                  <p>{hangar.doorWidth}'</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Collapse>
    </li>
  );
};
