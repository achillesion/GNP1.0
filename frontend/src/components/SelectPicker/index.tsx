import sass from "./SelectPicker.module.scss";
import { FC, FocusEvent, useState } from "react";
import { Select } from "antd";
import { FormikValues } from "formik";
import { Option } from "../../d";
import { useResize } from "../../hooks";

type SelectPickerProps = {
	data: Option[];
	label: string;
	formik: FormikValues;
	name: string;
	placeholder?: string;
	value?: string;
	showSearch?: boolean;
	disabled?: boolean;
	loading?: boolean;
	onChange?: (value: string, option?: Option | Option[]) => void;
};

export const SelectPicker: FC<SelectPickerProps> = ({
	data,
	placeholder,
	label,
	formik,
	name,
	onChange,
	showSearch = false,
	value,
	disabled,
	loading,
}) => {
	const [touched, setTouched] = useState(false);

	const handleBlur = (event: FocusEvent<HTMLElement, Element>) => {
		setTouched(true);
		formik.handleBlur(event);
	};

	const handleChange = (value: string) => {
		formik.setValues({
			...formik.values,
			[name]: value,
		});

		if (onChange !== undefined) {
			onChange(value);
		}
	};

	const windowWidth = useResize();
	const isMobile = windowWidth < 630;

	const isError = touched && formik.errors[name!];

	return (
		<label htmlFor={name} className={sass.wrapper}>
			<p>{label}</p>
			<Select
				status={isError && "error"}
				loading={loading}
				disabled={disabled}
				showSearch={showSearch}
				id={name}
				value={value}
				className={sass.select}
				placeholder={placeholder}
				onBlur={handleBlur}
				onChange={handleChange}
				options={data}
			/>
			{!isMobile && isError && (
				<div className={sass.errorText}>{formik.errors[name!]}</div>
			)}
		</label>
	);
};
