import sass from "./SearchInput.module.scss";
import { FormikValues } from "formik";
import {
	ChangeEvent,
	DetailedHTMLProps,
	FC,
	InputHTMLAttributes,
	useState,
} from "react";

type TextInputProps = {
	label?: string;
	formik: FormikValues;
	icon?: JSX.Element;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const SearchInput: FC<TextInputProps> = ({
	formik,
	name,
	type,
	placeholder,
	disabled,
	icon,
	onChange,
	style,
}) => {
	const isError = formik.errors[name!] && formik.touched[name!];

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [showPassword, setShowPassword] = useState(false);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (onChange !== undefined) {
			onChange(event);
		}

		formik.handleChange(event);
	};

	return (
		<label style={style} className={sass.label}>
			<div className={sass.inputWrapper}>
			{icon !== undefined && <div className={sass.icon}>{icon}</div>}
				<input
					value={formik.values[name!]}
					onChange={handleChange}
					onBlur={formik.handleBlur}
					className={sass.input}
					id={name}
					name={name}
					type={type === undefined ? "text" : showPassword ? "text" : type}
					placeholder={placeholder === undefined ? "" : placeholder}
					disabled={disabled !== undefined ? disabled : false}
				/>
			</div>
			{isError && <div className={sass.errorText}>{formik.errors[name!]}</div>}
		</label>
	);
};
