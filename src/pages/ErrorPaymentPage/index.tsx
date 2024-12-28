import sass from "./ErrorPaymentPage.module.scss";
import { FC } from "react";
import { Container } from "../../components";

export const ErrorPaymentPage: FC = () => {
	return (
		<div className={sass.wrapper}>
			<Container>
				<div className={sass.paymentInner}>
					<p className={sass.text}>Somethin wrong, try again later.</p>
				</div>
			</Container>
		</div>
	);
};
