import sass from "./ReservationsTop.module.scss";
import { FC } from "react";

export const HangarReservationsTop: FC = () => {
  return (
    <div className={sass.top}>
      <h2 className={sass.title}>Current Reservations of Your Hangars</h2>
    </div>
  );
};
