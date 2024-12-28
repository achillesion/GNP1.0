import sass from "./EditAircraftForm.module.scss";
import { FC, useEffect } from "react";
import { useFormik } from "formik";
import { CreateAircraftValues } from "../../../../d";
import {
	AccentButton,
	Loader,
	LoadingScreen,
	TextInput,
} from "../../../../components";
import { useLocation, useNavigate } from "react-router-dom";
import { getPoint } from "../../../../utils";
import { useAppDispatch, useAppState } from "../../../../hooks";
import { findAircraftById, updateAircraft } from "../../../../redux/store";
import { validationSchema } from "./validationSchema";

const initialValues: CreateAircraftValues = {
	name: "",
	homeAirport: "",
	model: "",
	nNumber: "",
	make: "",
	year: "",
};

export const EditAircraftForm: FC = () => {
	const { aircraft } = useAppState();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const aircraftId = getPoint(pathname);

	useEffect(() => {
		dispatch(findAircraftById(aircraftId));
	}, [aircraftId, dispatch]);

	const onSubmit = (values: CreateAircraftValues) => {
		dispatch(updateAircraft({ ...values, id: aircraftId }));
	};

	const formik = useFormik({
		initialValues,
		onSubmit,
		validationSchema,
	});

	useEffect(() => {
		if (aircraft.foundAircraft) {
			formik.setValues({
				...formik.values,
				name: aircraft.foundAircraft?.name || "",
				homeAirport: aircraft.foundAircraft?.homeAirport || "",
				model: aircraft.foundAircraft?.model || "",
				nNumber: aircraft.foundAircraft?.nNumber || "",
				make: aircraft.foundAircraft?.make || "",
				year: aircraft.foundAircraft?.year || "",
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [aircraft.foundAircraft]);

	return (
		<>
			{aircraft.isLoading ? (
				<LoadingScreen />
			) : (
				<form className={sass.form} onSubmit={formik.handleSubmit}>
					<div className={sass.formInner}>
						<div className={sass.formBlock}>
							<TextInput name="name" label={"Name"} formik={formik} />
							<TextInput
								name="homeAirport"
								label={"Home Airport"}
								formik={formik}
							/>
							<TextInput name="model" label={"Model"} formik={formik} />
						</div>
						<div className={sass.formBlock}>
							<TextInput name="nNumber" label={"N Number"} formik={formik} />
							<TextInput name="make" label={"Make"} formik={formik} />
							<TextInput name="year" label={"Year"} formik={formik} />
						</div>
					</div>
					<div className={sass.buttons}>
						{aircraft.isLoadingUpdate ? (
							<div className={sass.loader}>
								<Loader />
							</div>
						) : (
							<>
								<AccentButton
									text={"Cancel"}
									variant="secondary"
									onClick={() => navigate(-1)}
								/>
								<AccentButton text={"Update"} type="submit" variant="primary" />
							</>
						)}
					</div>
				</form>
			)}
		</>
	);
};
