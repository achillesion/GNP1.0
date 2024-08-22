import sass from "./EditBillingPaymentInfoForm.module.scss";
import { FC, useEffect } from "react";
import { useFormik } from "formik";
import { useAppDispatch, useAppState, useLocality } from "../../../../hooks";
import {
  AccentButton,
  Loader,
  SelectPicker,
  TextInput,
} from "../../../../components";
import { updatePaymentInfo } from "../../../../redux/store";
import { InitialPaymentInfoValues } from "../../../../d";
import { validationSchema } from "./validationSchema";
import { useNavigate } from "react-router-dom";

const initialValues: InitialPaymentInfoValues = {
  firstName: "",
  lastName: "",
  phone: "",
  city: "",
  country: "",
  state: "",
  zipCode: "",
  address: "",
  email: "",
  businessName: "",
};

export const EditBillingPaymentInfoForm: FC = () => {
  const { payment } = useAppState();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values: InitialPaymentInfoValues) => {
    dispatch(updatePaymentInfo({ ...values, id: payment.paymentInfo?.id! }));
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

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      firstName: payment.paymentInfo?.firstName || "",
      lastName: payment.paymentInfo?.lastName || "",
      phone: payment.paymentInfo?.phone || "",
      city: payment.paymentInfo?.city || "",
      country: payment.paymentInfo?.country || "",
      state: payment.paymentInfo?.state || "",
      email: payment.paymentInfo?.email || "",
      zipCode: payment.paymentInfo?.zipCode || "",
      address: payment.paymentInfo?.address || "",
      businessName: payment.paymentInfo?.businessName || "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payment.paymentInfo]);

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
    <form onSubmit={formik.handleSubmit} className={sass.form}>
      <div className={sass.formInner}>
        <div className={sass.formBlock}>
          <TextInput
            name="firstName"
            label={"First Name"}
            formik={formik}
            placeholder="Enter First Name"
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
            disabled={formik.values.country === ""}
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
            disabled={formik.values.state === ""}
            data={
              citiesOfState
                ? citiesOfState.map(({ name }) => ({
                    value: name,
                    label: name,
                  }))
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
        </div>
        <div className={sass.formBlock}>
          <TextInput
            name="lastName"
            label={"Last Name"}
            formik={formik}
            placeholder="Enter Last Name"
          />
          <TextInput
            name="zipCode"
            label={"Zip Code"}
            formik={formik}
            placeholder="Enter Zip Code"
          />
          <TextInput
            name="address"
            label={"Address"}
            formik={formik}
            placeholder="Street"
          />
          <TextInput
            name="email"
            label={"Email"}
            formik={formik}
            placeholder="Enter Email"
          />
          <TextInput
            name="businessName"
            label={"Business Name"}
            formik={formik}
            placeholder="Enter Business Name"
          />
        </div>
      </div>
      <div className={sass.buttons}>
        {payment.isUpdatingLoading ? (
          <Loader />
        ) : (
          <>
            <AccentButton
              text={"Cancel"}
              variant="secondary"
              onClick={() => navigate(-1)}
            />
            <AccentButton text={"Update"} type="submit" variant="primary" />
          </>
        )}
      </div>
    </form>
  );
};
