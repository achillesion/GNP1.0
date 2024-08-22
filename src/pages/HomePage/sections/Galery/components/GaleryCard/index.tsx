import sass from "./GaleryCard.module.scss";
import { FC, useState } from "react";
import { Hangar } from "../../../../../../d";
import { Star } from "../../../../../../icons";
import { formatDecimal } from "../../../../../../utils";
import { useAppDispatch, useAppState } from "../../../../../../hooks";
import { setHomeModal } from "../../../../../../redux/store";
import { Link } from "react-router-dom";

type GaleryCardProps = {
  card: Hangar;
};

const { REACT_APP_IMAGE_BASIC_PATH } = process.env;

export const GaleryCard: FC<GaleryCardProps> = ({ card }) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { authenticate } = useAppState();

  const handleClick = () => {
    if (authenticate.isLoggedIn) {
      return setIsOpen(!isOpen);
    }
    return dispatch(setHomeModal(true));
  };

  return (
    <li className={sass.card} onClick={handleClick}>
      <div className={sass.cardInner}>
        <div className={sass.cardImage}>
          <img
            height={200}
            src={`${REACT_APP_IMAGE_BASIC_PATH}${card.photo}`}
            alt={card.title}
          />
        </div>
        <div className={sass.cardDescription}>
          <div className={sass.text}>
            <p className={sass.aircraft}>{card.airport.name}</p>
            <div className={sass.identifier}>
              <p className={sass.identifierText}>
                Airport Identifier:- <span>{card.airport.identifier}</span>
              </p>
            </div>
            {isOpen ? (
              <p className={sass.price}>${card.price} per night</p>
            ) : (
              <p className={sass.showInfo}>show info</p>
            )}
          </div>
          <div className={sass.rating}>
            <Star />
            <p className={sass.ratingValue}>{formatDecimal(card.rating)}</p>
            <Link to={`/account/chat/${card.user_id}`} className={sass.chat}>
              Chat
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
};
