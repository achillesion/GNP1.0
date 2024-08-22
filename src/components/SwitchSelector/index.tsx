import sass from "./SwitchSelector.module.scss";
import { FC } from "react";
import { useAppDispatch, useAppState } from "../../hooks";
import { toggleReservations } from "../../redux/store";

export const SwitchSelector: FC = () => {
	const { reservations } = useAppState();
	const dispatch = useAppDispatch();

	const setLeft = () => {
		if (!reservations.isCurrentReservations) {
			dispatch(toggleReservations());
		}
	};

	const setRight = () => {
		if (reservations.isCurrentReservations) {
			dispatch(toggleReservations());
		}
	};

	return (
		<div className={sass.wrapper}>
			<button className={sass.switcher} onClick={setLeft} type="button">
				Current
			</button>
			<button className={sass.switcher} onClick={setRight} type="button">
				Past
			</button>
			<span
				className={
					reservations.isCurrentReservations
						? sass.indicatorLeft
						: sass.indicatorRight
				}
			/>
		</div>
	);
};
