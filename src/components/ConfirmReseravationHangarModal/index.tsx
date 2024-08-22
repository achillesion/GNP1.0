import sass from "./ConfirmReseravationHangarModal.module.scss";
import { FC, useEffect } from "react";
import { useAppDispatch, useAppState } from "../../hooks";
import { Close } from "../../icons";
import { Loader } from "../Loader";
import { AccentButton } from "../AccentButton";
import { ConfirmReservationHangar, Hangar } from "../../d";
import { DateRange, SelectPicker } from "..";
import { useFormik } from "formik";
import {
	createPlan,
	createPrice,
	createProduct,
	createSession,
	fetchAircrafts,
	setReservation,
} from "../../redux/store";
import { paymentMethods } from "../../constants";
import { validationSchema } from "./validationSchema";
import { calculateAmount } from "../../utils";

type ConfirmReseravationHangarModalProps = {
	isOpen: boolean;
	hangar: Hangar | null;
	onClose: () => void;
};

const initialValues: ConfirmReservationHangar = {
	startTime: "",
	endTime: "",
	aircraftId: "",
	payment: "",
};

export const ConfirmReseravationHangarModal: FC<
	ConfirmReseravationHangarModalProps
> = ({ isOpen, hangar, onClose }) => {
	const { aircraft, authenticate, reservations } = useAppState();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (authenticate.isLoggedIn) {
			dispatch(fetchAircrafts());
		}
	}, [dispatch, authenticate.isLoggedIn]);

	useEffect(() => {
		if (reservations.productId !== "") {
			dispatch(
				createPlan({
					amount: calculateAmount({ amount: Number(hangar?.price!) }),
					currency: "usd",
					productId: reservations.productId,
					interval: "month",
				})
			);
		}
	}, [dispatch, hangar?.price, reservations.productId]);

	useEffect(() => {
		if (reservations.planId !== "") {
			dispatch(
				createPrice({
					unitAmount: calculateAmount({ amount: Number(hangar?.price!) }),
					productName: reservations.productName,
				})
			);
		}
	}, [dispatch, hangar?.price, reservations.planId, reservations.productName]);

	useEffect(() => {
		if (reservations.priceId !== "") {
			dispatch(
				createSession({
					priceId: reservations.priceId,
				})
			);
		}
	}, [dispatch, reservations.priceId]);

	useEffect(() => {
		if (reservations.url !== "") {
			window.location.replace(reservations.url);
		}
	}, [reservations.url]);

	const onSubmit = async (values: ConfirmReservationHangar) => {
		dispatch(createProduct(hangar?.title!));
		dispatch(
			setReservation({
				...values,
				hangarId: hangar?.id!,
				price: 0,
			})
		);
	};

	const formik = useFormik({
		initialValues,
		onSubmit,
		validationSchema,
	});

	const aircraftsData = aircraft.aircrafts.map((aircraft) => ({
		value: aircraft.id,
		label: aircraft.name,
	}));

	return (
		<>
			<div
				onClick={onClose}
				className={isOpen ? sass.backdropActive : sass.backdrop}
			></div>
			<div className={isOpen ? sass.bodyModalActive : sass.bodyModal}>
				<button
					aria-label="Close confirm reservation"
					type="button"
					onClick={onClose}
					className={sass.closeBtn}
				>
					<Close />
				</button>
				<form
					onSubmit={formik.handleSubmit}
					className={isOpen ? sass.bodyModalActive : sass.bodyModal}
				>
					<div className={sass.modalInner}>
						<p className={sass.title}>Confirmation</p>
						<div className={sass.hangar}>
							<p className={sass.hangarTitle}>{hangar?.title}</p>
							<DateRange
								formik={formik}
								startName={"startTime"}
								endName={"endTime"}
								blockOffStartDate={hangar?.blockOffStartDate}
								blockOffEndDate={hangar?.blockOffEndDate}
							/>
							<SelectPicker
								loading={aircraft.isLoading}
								placeholder="Select your aircraft"
								data={aircraftsData}
								label={""}
								formik={formik}
								name={"aircraftId"}
							/>
							<SelectPicker
								loading={aircraft.isLoading}
								placeholder="Select payment"
								data={paymentMethods}
								label={""}
								formik={formik}
								name={"payment"}
							/>
						</div>
						{reservations.isCreatingSubscription ? (
							<div className={sass.loader}>
								<Loader />
							</div>
						) : (
							<div className={sass.buttons}>
								<AccentButton
									type="button"
									onClick={onClose}
									fullWidth
									text={"Cancel"}
									variant="secondary"
								/>
								<AccentButton
									type="submit"
									fullWidth
									text={"Confirm"}
									variant="primary"
								/>
							</div>
						)}
					</div>
				</form>
			</div>
		</>
	);
};
