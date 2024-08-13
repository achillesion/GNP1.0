import sass from "./FileInput.module.scss";
import { FormikValues } from "formik";
import {
	ChangeEvent,
	DetailedHTMLProps,
	FC,
	InputHTMLAttributes,
	useEffect,
	useState,
} from "react";
import { ValidationMessagesService } from "../../utils";
import { IoMdClose } from "react-icons/io";


type FileInputProps = {
	formik: FormikValues;
	file?: File | null | string,
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const FileInput: FC<FileInputProps> = ({
	formik,
	name,
	onChange,
	placeholder = "Choose a file",
	file = null,
}) => {
	const isError = formik.errors[name!];

	const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
	const [selectedFile, setSelectedFile] = useState<File | null | string>(file);
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

	useEffect(() => {
		if (formik.values[name!] instanceof Blob) {
			const reader = new FileReader();

			reader.readAsDataURL(formik.values[name!]);
			setSelectedFile(formik.values[name!]);

			setPreview(formik.values[name!]);

			reader.onload = () => {
				setPreview(reader.result);
			};

			formik.setValues({
				...formik.values,
				[name!]: formik.values[name!],
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values[name!]]);

	useEffect(() => {
		if (selectedFile !== null) {
			formik.setValues({
				...formik.values,
				[name!]: selectedFile,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [name, selectedFile]);


	const clear = () => {
			setSelectedFile(null);
			setPreview(null);
	}

	return (
		<>
			{preview ? (
				<div className={sass.preview}>
					<div 
						className={sass.close}
						onClick={clear}
					><IoMdClose style={{color: 'red'}} /></div>
					<img
						className={sass.image}
						src={preview as unknown as string}
						alt="preview"
					/>
				</div>
			) :
			<label className={sass.label} htmlFor={name}>
				{placeholder !== undefined ? placeholder : ""}
				<input
					type="file"
					id={name}
					name={name}
					onChange={handleChange}
					className={sass.input}
					accept={ValidationMessagesService.getAvailableFileFormats()}
				/>
				{isError && (
					<div className={sass.errorText}>{formik.errors[name!]}</div>
				)}
			</label>}
		</>
	);
};
