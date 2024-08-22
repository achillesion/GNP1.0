import sass from "./EditHangarsPage.module.scss";
import { Divider, NavigationBack } from "../../components";
import { FC } from "react";
import { EditHangarForm } from "./components";

export const EditHangarsPage: FC = () => {
	return (
		<div className={sass.wrapper}>
			<div className={sass.top}>
				<NavigationBack />
				<h2 className={sass.title}>Edit Hangar</h2>
				<div className={sass.divider}>
					<Divider />
				</div>
			</div>
			<div className={sass.form}>
				<EditHangarForm />
			</div>
		</div>
	);
};
