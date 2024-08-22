import sass from "./CreateBillingPaymentInfoPage.module.scss";
import { FC } from "react";
import { Divider, NavigationBack } from "../../components";
import { CreateBillingPaymentForm } from "./components";

export const CreateBillingPaymentInfoPage: FC = () => {
	return (
		<div className={sass.wrapper}>
			<div className={sass.top}>
				<NavigationBack />
				<h2 className={sass.title}>Create Billing & Payment Info</h2>
			</div>
			<div className={sass.divider}>
				<Divider />
			</div>
			<div className={sass.form}>
				<CreateBillingPaymentForm />
			</div>
		</div>
	);
};
