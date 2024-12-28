import sass from "./MyCheckbox.module.scss";
import { Checkbox } from "antd";
import { FormikValues } from "formik";
import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";

type MyCheckboxProps = {
	label: string;
	formik: FormikValues;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const MyCheckbox: FC<MyCheckboxProps> = ({
	label,
	name,
	formik,
	value,
}) => {
	return (
		<label className={sass.label} htmlFor={`${value}`}>
			<Checkbox
				name={name}
				id={`${value}`}
				onChange={(event) => {
					formik.handleChange(event);

					if (formik.values[name!].includes(value)) {
						const findIndex = formik.values[name!].findIndex(
							(check: string) => check === value
						);

						const filteredChecked = formik.values[name!].filter(
							(check: string, index: number) => index !== findIndex
						);

						formik.setValues({
							...formik.values,
							[name!]: filteredChecked,
						});
					} else {
						const checkeds = [...formik.values[name!]];

						checkeds.push(value);

						formik.setValues({
							...formik.values,
							[name!]: checkeds,
						});
					}
				}}
				checked={formik.values[name!].includes(value)}
			/>
			{label}
		</label>
	);
};
