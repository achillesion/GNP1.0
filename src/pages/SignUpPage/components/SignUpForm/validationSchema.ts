import * as Yup from "yup";
import { validationInfo } from "../../../../constants";

export const validationSchema = Yup.object().shape({
	name: Yup.string()
		.min(2, "Minimum 2 characters")
		.max(60, "Maximum 60 characters")
		.required("Required"),
	email: Yup.string()
		.matches(validationInfo.emailRegExp, "Enter valid email")
		.required("Required"),
	phone: Yup.string()
		.matches(
			validationInfo.phoneRegex,
			"Phone number must contain only digits and start with +"
		)
		.required("Required"),
	country: Yup.string().required("Required"),
	city: Yup.string(),
	state: Yup.string(),
	password: Yup.string().min(8).required("Required"),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref("password")], "Passwords must match")
		.required()
		.min(8),
});
