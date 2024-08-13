import sass from "./SignUpForm.module.scss";
import { FC } from "react";
import { useFormik } from "formik";
import { register, setRoute } from "../../../../redux/store";
import { useAppDispatch, useAppState, useLocality } from "../../../../hooks";
import {
  AccentButton,
  Loader,
  SelectPicker,
  TextInput,
} from "../../../../components";
import { RegisterValues } from "../../../../d";
import { validationSchema } from "./validationSchema";
import { useNavigate } from "react-router-dom";

const initialValues: RegisterValues = {
  name: "",
  email: "",
  phone: "+1",
  city: "",
  state: "",
  country: "",
  password: "",
  confirmPassword: "",
};

export const SignUpForm: FC = () => {
  const { authenticate, saveNavigation } = useAppState();
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  const onSubmit = async (values: RegisterValues) => {
    const registerResponse = await dispatch(register(values));

    if (registerResponse.type === "register/fulfilled") {
      if (saveNavigation.saveRoute !== "") {
        setTimeout(() => {
          navigation(saveNavigation.saveRoute);
          dispatch(setRoute(""));
        }, 0);
      }
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const {
    allCountries,
    statesOfCountry,
    citiesOfState,
    handleChangeCountry,
    handleChangeState,
  } = useLocality(formik);

  const countriesData = allCountries.map((country) => ({
    value: country.name,
    label: (
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <p>{country.flag}</p>
        <p>{country.name}</p>
      </div>
    ),
  }));

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={sass.inputs}>
        <TextInput
          label="Name*"
          formik={formik}
          name="name"
          placeholder="Enter your name"
        />
        <TextInput
          label="Email*"
          formik={formik}
          name="email"
          placeholder="Enter your email"
        />
        <SelectPicker
          placeholder="Select Country"
          value={formik.values.country}
          showSearch
          data={countriesData}
          label={"Country*"}
          formik={formik}
          name={"country"}
          onChange={handleChangeCountry}
        />
        <SelectPicker
          placeholder="Select State"
          value={formik.values.state}
          showSearch
          disabled={
            formik.values.country === "" ||
            statesOfCountry === null ||
            statesOfCountry.length === 0
          }
          data={
            statesOfCountry
              ? statesOfCountry.map(({ name }) => ({
                  value: name,
                  label: name,
                }))
              : []
          }
          label={"State"}
          formik={formik}
          name={"state"}
          onChange={handleChangeState}
        />
        <SelectPicker
          placeholder="Select City"
          value={formik.values.city}
          showSearch
          disabled={
            formik.values.state === "" ||
            citiesOfState === null ||
            citiesOfState.length === 0
          }
          data={
            citiesOfState
              ? citiesOfState.map(({ name }) => ({ value: name, label: name }))
              : []
          }
          label={"City"}
          formik={formik}
          name={"city"}
        />
        <TextInput
          label="Phone*"
          formik={formik}
          name="phone"
          placeholder="Enter Your phone"
        />
        <TextInput
          label="Password*"
          formik={formik}
          name="password"
          placeholder="Enter your password"
          type="password"
        />
        <TextInput
          label="Confirm Password*"
          formik={formik}
          name="confirmPassword"
          placeholder="Enter your confirm password"
          type="password"
        />
      </div>
      {authenticate.isLoading ? (
        <div className={sass.loader}>
          <Loader />
        </div>
      ) : (
        <AccentButton fullWidth text="Sign Up" type="submit" />
      )}
    </form>
  );
};
