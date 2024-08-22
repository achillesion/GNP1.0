/* eslint-disable react-hooks/exhaustive-deps */
import sass from "./CreateAircraftForm.module.scss";
import { FC, useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { AccentButton, Loader, TextInput } from "../../../../components";
import { CreateAircraftValues } from "../../../../d";
import { useAppDispatch, useAppState } from "../../../../hooks";
import { createAircraft, setSuccess } from "../../../../redux/store";
import { validationSchema } from "./validationSchema";

const initialValues: CreateAircraftValues = {
  name: "",
  homeAirport: "",
  model: "",
  nNumber: "",
  make: "",
  year: "",
};

export const CreateAircraftForm: FC = () => {
  const { aircraft, authenticate } = useAppState();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = (values: CreateAircraftValues) => {
    dispatch(createAircraft({ ...values, owner: authenticate.user?.name! }));
  };
  useEffect(()=>{
    if(aircraft.success) {
      formik.resetForm()
      navigate(-1)
    } 
    dispatch(setSuccess())
  },[aircraft.success])

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <form className={sass.form} onSubmit={formik.handleSubmit}>
      <div className={sass.formBody}>
        <div className={sass.formBlock}>
          <TextInput
            name="name"
            label={"Name*"}
            formik={formik}
            placeholder="Enter aircraft name"
          />
          <TextInput
            name="homeAirport"
            label={"Home Airport*"}
            formik={formik}
            placeholder="Enter code"
          />
          <TextInput
            name="model"
            label={"Model*"}
            formik={formik}
            placeholder="Enter model name"
          />
        </div>
        <div className={sass.formBlock}>
          <TextInput
            name="nNumber"
            label={"N Number*"}
            formik={formik}
            placeholder="Enter n number"
          />
          <TextInput
            name="make"
            label={"Make*"}
            formik={formik}
            placeholder="Enter your make name"
          />
          <TextInput
            name="year"
            label={"Year"}
            formik={formik}
            placeholder="Select year"
          />
        </div>
      </div>
      <div className={sass.buttons}>
        {aircraft.isLoadingCreating ? (
          <Loader />
        ) : (
          <>
            <AccentButton
              type="button"
              onClick={() => navigate(-1)}
              text={"Cancel"}
              variant="secondary"
            />
            <AccentButton type="submit" text={"Create"} variant="primary" />
          </>
        )}
      </div>
    </form>
  );
};
