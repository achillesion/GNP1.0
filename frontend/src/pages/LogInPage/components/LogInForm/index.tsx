import sass from "./LogInForm.module.scss";
import { useFormik } from "formik";
import { FC } from "react";
import { LogInValues } from "../../../../d";
import { AccentButton, Loader, TextInput } from "../../../../components";
import { validationSchema } from "./validationSchema";
import { useAppDispatch, useAppState } from "../../../../hooks";
import { login, setRoute } from "../../../../redux/store";
import { useNavigate } from "react-router-dom";

const initialValues = {
	email: "",
	password: "",
};

export const LogInForm: FC = () => {
	const dispatch = useAppDispatch();
	const { authenticate, saveNavigation } = useAppState();
	const navigation = useNavigate();

	const onSubmit = (values: LogInValues) => {
		dispatch(login(values));

		if (saveNavigation.saveRoute !== "") {
			setTimeout(() => {
				navigation(`/${saveNavigation.saveRoute}`);
				dispatch(setRoute(""));
			}, 0);
		}
	};

	const formik = useFormik({
		initialValues,
		onSubmit,
		validationSchema,
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<div className={sass.inputs}>
				<TextInput name="email" label="Email or username" formik={formik} />
				<TextInput
					name="password"
					label="Password"
					formik={formik}
					type="password"
				/>
			</div>
			{authenticate.isLoading ? (
				<div className={sass.loader}>
					<Loader />
				</div>
			) : (
				<AccentButton fullWidth text="Sign In" type="submit" />
			)}
		</form>
	);
};
