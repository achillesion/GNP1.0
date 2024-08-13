/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import sass from "./EditHangarForm.module.scss";
import { useFormik } from "formik";
import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppState } from "../../../../hooks";
import { fetchHangarImage, getPoint } from "../../../../utils";
import { CreateHangarValues } from "../../../../d";
import {
	AccentButton,
	DateRange,
	DescriptionField,
	FileInput,
	Loader,
	LoadingScreen,
	SelectPicker,
	TextInput,
} from "../../../../components";
import {
	findHangarById,
	setSuccessHangars,
	updateHangar,
	uploadHangarPhoto,
} from "../../../../redux/store";
import { validationSchema } from "./validationSchema";
import { toast } from "react-toastify";

const { REACT_APP_IMAGE_BASIC_PATH } = process.env;

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

export const EditHangarForm: FC = () => {
	const { hangars } = useAppState();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const [_, setIsLoadHangarImage] = useState<boolean>(false);
	const [changePhoto, setChangePhoto] = useState(false)

	const hangarId = getPoint(pathname);

	useEffect(() => {
		dispatch(findHangarById(hangarId));
	}, [dispatch, hangarId]);

	const onSubmit = async ({
		photo,
		airport,
		...values
	}: CreateHangarValues) => {
		
		const resUpdateHangar = await dispatch(
			updateHangar({ ...values, id: hangarId })
		);
		
		if (resUpdateHangar.type === "updateHangar/fulfilled") {
			dispatch(uploadHangarPhoto({ photo: photo!, id: hangarId }));
		}
	};

	const formik = useFormik({
		initialValues,
		onSubmit,
		validationSchema,
	});
	useEffect(()=>{
		if(hangars.success) {
			dispatch(setSuccessHangars(false));
			navigate(-1)
		}
	},[hangars.success])


	useEffect(() => {
		if (hangars.foundHangar) {
			const {...restHangar } = hangars.foundHangar;
			const entries = Object.entries(restHangar);
			const filteredEntries = entries.filter(([key, value]) => value !== null);
			const filteredObj = Object.fromEntries(filteredEntries);
			formik.setValues({
				...formik.values,
				...filteredObj,
				airportIdentifier: hangars.foundHangar.airport.identifier,
				photo: null,
			});


			fetchHangarImage(
				`${REACT_APP_IMAGE_BASIC_PATH}${hangars.foundHangar.photo}`,
				setIsLoadHangarImage
			).then((photo) => {
				formik.setValues({
					...formik.values,
					...filteredObj,
					airportIdentifier: hangars.foundHangar?.airport.identifier!,
					photo,
				});
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hangars.foundHangar]);

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
		<>
			{hangars.isLoading ? (
				<LoadingScreen />
			) : (
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
								<div className={sass.inputBox}>
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

							{changePhoto 
								? <div className={sass.inputBox}>
									<FileInput name="photo" formik={formik} />
								</div>
								:<div className={sass.imageSection} onClick={()=>setChangePhoto(true)}>
									<div className={sass.uploadPhoto}>Select another file</div>
									<img src={`${REACT_APP_IMAGE_BASIC_PATH+String(hangars.foundHangar?.photo)}`} alt="hangar image"/>
								</div>
							}
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
					{hangars.isUpdatingHangar ? (
						<Loader />
					) : (
						<>
							<AccentButton
								type="button"
								onClick={() => navigate(-1)}
								text={"Cancel"}
								variant="secondary"
							/>
							<AccentButton type="submit" text={"Update"} variant="primary" />
						</>
					)}
				</div>
			</form>
			)}
		</>
	);
};
