import sass from "./BasicInformation.module.scss";
import { FC } from "react";
import { UserInfoForm } from "./components";

export const BasicInformation: FC = () => {
	return (
		<div className={sass.wrapper}>
			<div className={sass.form}>
				<UserInfoForm />
			</div>
		</div>
	);
};
