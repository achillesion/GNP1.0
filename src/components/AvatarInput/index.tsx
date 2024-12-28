import sass from "./AvatarInput.module.scss";
import { FormikValues } from "formik";
import {
	ChangeEvent,
	DetailedHTMLProps,
	FC,
	FocusEvent,
	InputHTMLAttributes,
	useEffect,
	useState,
} from "react";
import { Edit } from "../../icons";
import { useAppState } from "../../hooks";
import {
	ValidationMessagesService,
	getFirstLetterOfUserName,
} from "../../utils";

const { REACT_APP_IMAGE_BASIC_PATH } = process.env;

type AvatarInputProps = {
	formik: FormikValues;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const AvatarInput: FC<AvatarInputProps> = ({
	formik,
	name,
	onChange,
}) => {
	const { authenticate } = useAppState();

	const [touched, setTouched] = useState<boolean>(false);
	const isError = formik.errors[name!] && touched;

	const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		formik.handleChange(event);

		const reader = new FileReader();

		if (event.target.files && event.target.files[0]) {
			reader.readAsDataURL(event.target.files[0]);
			setSelectedFile(event.target.files[0]);

			setTimeout(() => {
				formik.setValues({
					...formik.values,
					[name!]: event.target.files![0],
				});
			}, 0);

			reader.onload = () => {
				setPreview(reader.result);
			};
		}

		if (onChange !== undefined) {
			onChange(event);
		}
	};

	const handleBlur = (event: FocusEvent<HTMLInputElement, Element>) => {
		formik.handleBlur(event);
		setTouched(true);
	};

	useEffect(() => {
		if (formik.values[name!] === "" && selectedFile !== null) {
			formik.setValues({
				...formik.values,
				[name!]: selectedFile,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values[name!]]);

	return (
		<label className={sass.avatar} htmlFor={name}>
			<span className={sass.letter}>
				{getFirstLetterOfUserName(authenticate.user?.name || "")}
			</span>
			{preview ? (
				<div className={sass.preview}>
					<img
						className={sass.image}
						src={preview as unknown as string}
						alt="preview"
					/>
					<p className={sass.previewText}>Preview</p>
				</div>
			) : authenticate.user?.avatar ? (
				<div className={sass.preview}>
					<img
						className={sass.image}
						src={`${REACT_APP_IMAGE_BASIC_PATH}${authenticate.user.avatar}`}
						alt="preview"
					/>
				</div>
			) : (
				<></>
			)}
			{preview !== null && (
				<div className={sass.preview}>
					<img
						className={sass.image}
						src={preview as unknown as string}
						alt="preview"
					/>
					<p className={sass.previewText}>Preview</p>
				</div>
			)}
			<input
				type="file"
				id={name}
				name={name}
				onChange={handleChange}
				onBlur={handleBlur}
				className={sass.input}
				accept={ValidationMessagesService.getAvailableFileFormats()}
			/>
			<div className={sass.edit}>
				<Edit />
			</div>
			{isError && <div className={sass.errorText}>{formik.errors[name!]}</div>}
		</label>
	);
};
