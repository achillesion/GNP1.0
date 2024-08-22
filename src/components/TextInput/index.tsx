import sass from "./TextInput.module.scss";
import { FormikValues } from "formik";
import {
	ChangeEvent,
	DetailedHTMLProps,
	FC,
	InputHTMLAttributes,
	useState,
} from "react";
import { IoMdEye, IoIosEyeOff } from "react-icons/io";

type TextInputProps = {
	label: string;
	formik: FormikValues;
	icon?: JSX.Element;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const TextInput: FC<TextInputProps> = ({
	label,
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

	const [showPassword, setShowPassword] = useState(false);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (onChange !== undefined) {
			onChange(event);
		}

		formik.handleChange(event);
	};

	return (
		<label style={style} className={sass.label}>
			{label}
			<div className={sass.inputWrapper}>
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
				{type === "password" && (
					<button
						aria-label={showPassword ? "Hide Password" : "Show Password"}
						type="button"
						className={sass.showPassword}
						onClick={() => setShowPassword((prev) => !prev)}
					>
						{showPassword ? (
							<IoIosEyeOff color="#6C6C6C" size={16} />
						) : (
							<IoMdEye color="#6C6C6C" size={16} />
						)}
					</button>
				)}
				{icon !== undefined && <div className={sass.icon}>{icon}</div>}
			</div>
			{isError && <div className={sass.errorText}>{formik.errors[name!]}</div>}
		</label>
	);
};
