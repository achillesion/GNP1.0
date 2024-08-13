import sass from "./ReservationsTop.module.scss";
import { FC } from "react";
import { useAppState } from "../../../../hooks";
import { SwitchSelector } from "../../../../components";

export const ReservationsTop: FC = () => {
  const { reservations } = useAppState();

  return (
    <div className={sass.top}>
      <h2 className={sass.title}>
        {reservations.isCurrentReservations
          ? "Current Reservation"
          : "Past Reservation"}
      </h2>
      <SwitchSelector />
    </div>
  );
};
