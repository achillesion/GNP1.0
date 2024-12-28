import sass from "./EditReservationPage.module.scss";
import { FC } from "react";
import { Divider, NavigationBack } from "../../components";
import { EditReservationForm } from "./components";

export const EditReservationPage: FC = () => {
	return (
		<div className={sass.wrapper}>
			<div className={sass.top}>
				<NavigationBack />
				<h2 className={sass.title}>Edit Reservation</h2>
				<div className={sass.divider}>
					<Divider />
				</div>
			</div>
			<div className={sass.form}>
				<EditReservationForm />
			</div>
		</div>
	);
};
