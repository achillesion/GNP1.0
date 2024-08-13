/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import sass from "./CreateHangarForm.module.scss";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {  useFormik } from "formik";
import {
	AccentButton,
	DateRange,
	DescriptionField,
	FileInput,
	Loader,
	SelectPicker,
	TextInput,
} from "../../../../components";
import { useAppDispatch, useAppState } from "../../../../hooks";
import { CreateHangarValues } from "../../../../d";
import { createHangar, setSuccessHangars } from "../../../../redux/store";
import { validationSchema } from "./validationSchema";
import { toast } from "react-toastify";

const initialValues: CreateHangarValues = {
	title: "",
	airportIdentifier: "",
	price: "",
	width: "",
	length: "",
	doorWidth: "",
	doorHeight: "",
	heated: '',
	accessType: "",
	cameras: '',
	livingQuarters: "",
	vacancyStartDate: "",
	vacancyEndDate: "",
	blockOffStartDate: "",
	blockOffEndDate: "",
	photo: null,
	description: "",
};

const inputs = [
	{title: 'title' , label: 'Title*' , placeholder: 'Enter title name'},
	{title: 'airportIdentifier' , label: 'Airport Identifier*' , placeholder: 'Enter code'},
	{title: 'price' , label: 'Enter price*' , placeholder: 'Enter hangar price'},
	{title: 'width' , label: 'Hangar Width (ft)' , placeholder: 'Enter hangar width'},
	{title: 'length' , label: 'Hangar Length (ft)' , placeholder: 'Enter hangar depth'},
	{title: 'doorWidth' , label: 'Door Width (ft)' , placeholder: 'Enter door width'},
	{title: 'doorHeight' , label: 'Door Height (ft)' , placeholder: 'Enter door Height'},
]

const selects = [
	{ name: 'heated', label: 'Heated', data:[
		{ value: "Yes", label: "Yes" },
		{ value: "No", label: "No" },
	], placeholder:'Select type' },
	{ name: 'accessType', label: 'Access Type (automatic door, cell enabled, etc.)', data:[
		{ value: "Key Code", label: "Key Code" },
		{ value: "Physical Key", label: "Physical Key" },
		{ value: "Meet in Person", label: "Meet in Person" },
	], placeholder:'Select type' },
	{ name: 'livingQuarters', label: 'Living quarters', data:[{ value: "Yes", label: "Yes" },{ value: "No", label: "No" },], placeholder:'Select type' },
	{ name: 'cameras', label: 'Cameras', data:[
		{ value: "Interior", label: "Interior" },
		{ value: "Exterior", label: "Exterior" },
		{ value: "Both", label: "Both" },
		{ value: "None", label: "None" },
	], placeholder:'Select type' },
]

export const CreateHangarForm: FC = () => {
	const { hangars } = useAppState();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(()=>{
		if(hangars.success) {
			formik.resetForm()
			navigate(-1)
			dispatch(setSuccessHangars(false))
		}
	},[hangars.success])

    const onSubmit = async (values: CreateHangarValues) => {
		console.log('submit')
        dispatch(createHangar(values));
    };
	
	const formik = useFormik({
		initialValues,
		onSubmit,
		validationSchema,
	});

    const handleSubmit = async () => {
        const errors = await formik.validateForm();
        if (Object.keys(errors).length > 0) {
            Object.entries(errors).map(item => {
				if(item[1] === 'Required') toast.error(`${item[0]} - ${item[1]}`)
			})     
		}
        formik.submitForm();
    };

	return (
		<form onSubmit={e => { e.preventDefault(); handleSubmit(); }} className={sass.form}>
			<div className={sass.formBody}>
				<div className={sass.content}>
					{inputs.map(item => (
						<div className={sass.inputBox} key={item.title}>
							<TextInput
								name={item.title}
								label={item.label}
								placeholder={item.placeholder}
								formik={formik}
							/>
						</div>
					))}
				</div>
				<hr style={{width: '100%', margin:0,}} color='#eee'/>
				<div className={sass.content}>	
					{selects.map(item => (
						<div 
							key={item.label}
							className={sass.inputBox}
						>
							<SelectPicker
								data={item.data}
								label={item.label}
								formik={formik}
								name={item.name}
								placeholder={item.placeholder}
							/>
						</div>
					))}
				</div>
				<hr style={{width: '100%', margin:0,}} color='#eee'/>
				<div className={sass.content}>
					<div className={sass.inputBox}>
						<p style={{marginBottom: '10px'}}>Vacancy Dates and times*</p>
						<DateRange
							formik={formik}
							startName={"vacancyStartDate"}
							endName={"vacancyEndDate"}
						/>
					</div>
					<div className={sass.inputBox}>
						<p style={{marginBottom: "10px"}}>Block Off Dates and times</p>
						<DateRange
							formik={formik}
							startName={"blockOffStartDate"}
							endName={"blockOffEndDate"}
						/>
					</div>

					<div className={sass.inputBox}>
						<p style={{marginBottom: "10px"}}>Download photo</p>
						<FileInput name="photo" formik={formik} />	
					</div>
				</div>
				<div className={sass.description}>
					<p style={{marginBottom: "10px"}}>Description</p>
					<DescriptionField
						name={"description"}
						formik={formik}
						placeholder="Enter description"
					/>
				</div>
			</div>
			<div className={sass.buttons}>
				{hangars.isCreatingHangar ? (
					<Loader />
				) : (
					<>
						<AccentButton
							type="button"
							onClick={() => navigate(-1)}
							text={"Cancel"}
							variant="secondary"
						/>
						<AccentButton 
							type="submit" 
							text={"Create"} 
							variant="primary"
						/>
					</>
				)}
			</div>
		</form>
	);
};

