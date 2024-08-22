import sass from "./SuccessPaymentPage.module.scss";
import { FC, useEffect } from "react";
import { Container, LoadingScreen } from "../../components";
import { useAppDispatch, useAppState } from "../../hooks";
import { createReservation } from "../../redux/store";

export const SuccessPaymentPage: FC = () => {
	const { payment, reservations } = useAppState();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (reservations.selectedReservation) {
			dispatch(createReservation(reservations.selectedReservation));
		}
	}, [dispatch, reservations.selectedReservation]);

	return (
		<>
			{reservations.isCreatingReservation ? (
				<LoadingScreen />
			) : (
				<div className={sass.wrapper}>
					<Container>
						<div className={sass.paymentInner}>
							<p className={sass.text}>
								Payment was successful! Thank you,{" "}
								{payment.paymentInfo?.firstName}
								{payment.paymentInfo?.lastName}
							</p>
						</div>
					</Container>
				</div>
			)}
		</>
	);
};
