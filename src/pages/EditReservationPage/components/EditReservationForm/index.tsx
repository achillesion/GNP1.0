import sass from "./EditReservationForm.module.scss";
import { FC, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useAppDispatch, useAppState } from "../../../../hooks";
import {
	findReservationById,
	updateReservation,
} from "../../../../redux/store";
import { getPoint } from "../../../../utils";
import {
	AccentButton,
	Loader,
	LoadingScreen,
	SelectDate,
	SelectPicker,
	TextInput,
} from "../../../../components";
import { EditReservationValues } from "../../../../d";
import { paymentMethods } from "../../../../constants";
import { validationSchema } from "./validationSchema";

const initialValues: EditReservationValues = {
	hangar: "",
	hangarOwner: "",
	aircraft: "",
	aircraftOwner: "",
	price: "",
	startTime: "",
	endTime: "",
	payment: "",
	commission: "",
	status: "",
};

export const EditReservationForm: FC = () => {
	const { reservations } = useAppState();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const reservationId = getPoint(pathname);

	useEffect(() => {
		dispatch(findReservationById(reservationId));
	}, [dispatch, reservationId]);

	const onSubmit = (values: EditReservationValues) => {
		dispatch(
			updateReservation({
				startTime: values.startTime,
				endTime: values.endTime,
				payment: values.payment,
				id: reservationId,
				hangarId: reservations.foundReservation?.hangar!.id!,
				aircraftId: reservations.foundReservation?.aircraft!.id!,
				price: values.price,
			})
		);
	};

	const formik = useFormik({
		initialValues,
		onSubmit,
		validationSchema,
	});

	useEffect(() => {
		if (reservations.foundReservation) {
			formik.setValues({
				...formik.values,
				hangar: reservations.foundReservation?.hangar?.title! || "",
				aircraftOwner: reservations.foundReservation?.aircraft?.owner! || "",
				price: reservations.foundReservation?.price! || "",
				startTime: reservations.foundReservation?.startTime! || "",
				payment: reservations.foundReservation?.payment! || "",
				hangarOwner: reservations.foundReservation?.hangar?.owner! || "",
				aircraft: reservations.foundReservation?.aircraft?.name! || "",
				commission: reservations.foundReservation?.commission! || "",
				endTime: reservations.foundReservation?.endTime! || "",
				status: reservations.foundReservation?.status! || "",
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reservations.foundReservation]);

	return (
		<>
			{reservations.isLoading ? (
				<LoadingScreen />
			) : (
				<form onSubmit={formik.handleSubmit} className={sass.form}>
					<div className={sass.formBody}>
						<div className={sass.formBlock}>
							<TextInput
								disabled
								name="hangar"
								label={"Hangar*"}
								formik={formik}
								placeholder="Enter hangar title"
							/>
							<TextInput
								disabled
								name="aircraftOwner"
								label={"Aircraft Owner"}
								formik={formik}
								placeholder="Enter Aircraft Owner"
							/>
							<TextInput
								disabled
								name="price"
								label={"Price*"}
								formik={formik}
								placeholder="Enter price"
							/>
							<SelectDate
								label="Start Time"
								name="startTime"
								formik={formik}
								type={"date"}
							/>
							<SelectPicker
								value={formik.values["payment"]}
								data={paymentMethods}
								label={"Payment Method"}
								formik={formik}
								name={"payment"}
								placeholder="Select payment method"
							/>
						</div>
						<div className={sass.formBlock}>
							<TextInput
								disabled
								name="hangarOwner"
								label={"Hangar Owner"}
								formik={formik}
								placeholder="Enter Hangar Owner"
							/>
							<TextInput
								disabled
								name="aircraft"
								label={"Aircraft"}
								formik={formik}
								placeholder="Enter Aircraft"
							/>
							<TextInput
								disabled
								name="commission"
								label={"Commission"}
								formik={formik}
							/>
							<SelectDate
								label="End Time"
								name="endTime"
								formik={formik}
								type={"date"}
							/>
							<TextInput
								disabled
								name="status"
								label={"Status"}
								formik={formik}
							/>
						</div>
					</div>
					<div className={sass.buttons}>
						{reservations.isUpdatingReservation ? (
							<Loader />
						) : (
							<>
								<AccentButton
									type="button"
									onClick={() => navigate(-1)}
									text={"Cancel"}
									variant="secondary"
								/>
								<AccentButton type="submit" text={"Update"} variant="primary" />
							</>
						)}
					</div>
				</form>
			)}
		</>
	);
};
