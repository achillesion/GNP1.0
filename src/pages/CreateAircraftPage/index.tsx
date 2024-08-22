import sass from "./CreateAircraftPage.module.scss";
import { FC } from "react";
import { Divider, NavigationBack } from "../../components";
import { CreateAircraftForm } from "./components";

export const CreateAircraftPage: FC = () => {
	return (
		<div className={sass.wrapper}>
			<div className={sass.top}>
				<NavigationBack />
				<h2 className={sass.title}>Create Aircraft</h2>
				<div className={sass.divider}>
					<Divider />
				</div>
			</div>
			<div className={sass.form}>
				<CreateAircraftForm />
			</div>
		</div>
	);
};
