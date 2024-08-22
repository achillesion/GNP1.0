import sass from "./EditBillingPaymentInfoPage.module.scss";
import { FC } from "react";
import { Divider, NavigationBack } from "../../components";
import { EditBillingPaymentInfoForm } from "./components";

export const EditBillingPaymentInfoPage: FC = () => {
	return (
		<div className={sass.wrapper}>
			<div className={sass.top}>
				<NavigationBack />
				<h2 className={sass.title}>Edit Billing & Payment Info</h2>
			</div>
			<div className={sass.divider}>
				<Divider />
			</div>
			<div className={sass.form}>
				<EditBillingPaymentInfoForm />
			</div>
		</div>
	);
};
