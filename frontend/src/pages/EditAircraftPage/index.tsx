import sass from "./EditAircraftPage.module.scss";
import { Divider, NavigationBack } from "../../components";
import { FC } from "react";
import { EditAircraftForm } from "./components";

export const EditAircraftPage: FC = () => {
	return (
		<div className={sass.wrapper}>
			<div className={sass.top}>
				<NavigationBack />
				<h2 className={sass.title}>Edit Aircraft</h2>
				<div className={sass.divider}>
					<Divider />
				</div>
			</div>
			<div className={sass.form}>
				<EditAircraftForm />
			</div>
		</div>
	);
};
