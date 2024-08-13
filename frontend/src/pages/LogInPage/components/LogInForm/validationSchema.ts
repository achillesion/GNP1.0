import * as Yup from "yup";
import { validationInfo } from "../../../../constants";

export const validationSchema = Yup.object().shape({
	email: Yup.string()
		.matches(validationInfo.emailRegExp, "Enter valid email")
		.required("Required"),
	password: Yup.string().required("Required"),
});
