import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
	from: Yup.string().required("Required"),
	to: Yup.string().required("Required"),
});
