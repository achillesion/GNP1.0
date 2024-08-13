import sass from "./DescriptionField.module.scss";
import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";
import { Input } from "antd";
import { FormikValues } from "formik";

const { TextArea } = Input;

type DescriptionFieldProps = {
	formik: FormikValues;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const DescriptionField: FC<DescriptionFieldProps> = ({
	name,
	formik,
	placeholder,
}) => {
	const isError = formik.errors[name!] && formik.touched[name!];

	return (
		<div className={sass.descriptionFieldWrapper}>
			<TextArea
				style={{ resize: "none" }}
				name={name}
				value={formik.values[name!]}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				rows={4}
				placeholder={placeholder}
				maxLength={300}
			/>
			{isError && <div className={sass.errorText}>{formik.errors[name!]}</div>}
		</div>
	);
};
