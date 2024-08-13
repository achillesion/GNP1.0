import sass from "./SelectDate.module.scss";
import {
	ElementType,
	FC,
	FocusEvent,
	HTMLInputTypeAttribute,
	useState,
} from "react";
import { DatePicker, TimePicker } from "antd";
import { FormikValues } from "formik";
import dayjs from "dayjs";

type SelectDateProps = {
	type: HTMLInputTypeAttribute;
	formik: FormikValues;
	name: string;
	icon?: ElementType;
	label?: string;
};

export const SelectDate: FC<SelectDateProps> = ({
	formik,
	type,
	name,
	icon,
	label,
}) => {
	const [touched, setTouched] = useState(false);

	const isError = touched && formik.errors[name!];

	const handleBlur = (event: FocusEvent<HTMLElement, Element>) => {
		setTouched(true);
		formik.handleBlur(event);
	};

	const handleChange = (date: dayjs.Dayjs, dateString: string | string[]) => {
		formik.setValues({
			...formik.values,
			[name]: dateString,
		});
	};

	return (
		<>
			{type === "time" ? (
				<div className={sass.wrapper}>
					{label !== undefined && <p className={sass.label}>{label}</p>}
					<TimePicker
						value={
							formik.values[name] === ""
								? null
								: dayjs(formik.values[name], "HH:mm")
						}
						id={name}
						name={name}
						use12Hours
						format="HH:mm"
						minuteStep={10}
						className={sass.picker}
						type={type}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					{isError && (
						<div className={sass.errorText}>{formik.errors[name!]}</div>
					)}
				</div>
			) : (
				<div className={sass.wrapper}>
					{label !== undefined && <p className={sass.label}>{label}</p>}
					<DatePicker
						minDate={dayjs()}
						id={name}
						name={name}
						value={
							formik.values[name] === "" ? null : dayjs(formik.values[name])
						}
						onChange={handleChange}
						onBlur={handleBlur}
						className={sass.picker}
						type={type}
					/>
					{isError && (
						<div className={sass.errorText}>{formik.errors[name!]}</div>
					)}
				</div>
			)}
		</>
	);
};
