import sass from "./CreateHangarsPage.module.scss";
import { FC } from "react";
import { Divider, NavigationBack } from "../../components";
import { CreateHangarForm } from "./components";

export const CreateHangarsPage: FC = () => {
	return (
		<div className={sass.wrapper}>
			<div className={sass.top}>
				<NavigationBack />
				<h2 className={sass.title}>Create Hangar</h2>
				<div className={sass.divider}>
					<Divider />
				</div>
			</div>
			<div className={sass.form}>
				<CreateHangarForm />
			</div>
		</div>
	);
};
