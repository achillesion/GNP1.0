/* eslint-disable react-hooks/exhaustive-deps */
import sass from "./UserInfoForm.module.scss";
import { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import { useAppDispatch, useAppState } from "../../../../hooks";
import { updateUser, uploadAvatar } from "../../../../redux/store";
import {
  AccentButton,
  Divider,
  AvatarInput,
  Loader,
  TextInput,
} from "../../../../components";
import { UpdateValues } from "../../../../d";
import { validationSchema } from "./validationSchema";

const initialValues: UpdateValues & { image: string | File | null } = {
  name: "",
  email: "",
  phone: "",
  password: "",
  newPassword: "",
  confirmPassword: "",
  image: "",
};

export const UserInfoForm: FC = () => {
  const { authenticate } = useAppState();
  const dispatch = useAppDispatch();
  const [changed, setChanged] = useState(false);

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  useEffect(() => {
    //check if values changed check formik value and user and set disable button status
    setChanged(false);
    if (
      formik.values.name !== authenticate.user?.name ||
      formik.values.email !== authenticate.user?.email ||
      (formik.values.newPassword &&
        formik.values.newPassword === formik.values.confirmPassword) ||
      formik.values.phone !== authenticate.user?.phone ||
      (formik.values.image && formik.values.image !== authenticate.user?.avatar)
    )
      setChanged(true);
  }, [formik]);

  useEffect(() => {
    formik.setValues({
      ...initialValues,
      name: authenticate.user?.name || "",
      email: authenticate.user?.email || "",
      phone: authenticate.user?.phone || "",
    });
  }, [authenticate.user]);

  function onSubmit(values: UpdateValues & { image: string | File | null }) {
    if (typeof values.image !== "string") {
      dispatch(uploadAvatar(values.image as File));
    }

    dispatch(
      updateUser({
        password: values.password,
        confirmPassword: values.confirmPassword,
        newPassword: values.newPassword,
        email: values.email,
        name: values.name,
        phone: values.phone,
        id: authenticate.user?.id!,
        city: authenticate.user?.city!,
        country: authenticate.user?.country!,
        state: authenticate.user?.state!,
        financialInfo: authenticate.user?.financialInfo!,
      })
    );
  }

  return (
    <form onSubmit={formik.handleSubmit} className={sass.form}>
      <div className={sass.info}>
        <AvatarInput name="image" formik={formik} />
        <p className={sass.name}>{authenticate.user?.name!}</p>
      </div>
      <div className={sass.personal}>
        <p className={sass.personalText}>Personal</p>
        <Divider />
      </div>
      <div className={sass.formInner}>
        <div className={sass.formBlock}>
          <TextInput name="name" label={"Name*"} formik={formik} />
          <TextInput name="email" label={"Email*"} formik={formik} disabled />
          <TextInput name="phone" label={"Phone*"} formik={formik} />
        </div>
        <div className={sass.formBlock}>
          <TextInput
            type="password"
            name="password"
            label={"Current Password*"}
            formik={formik}
            placeholder="Enter your current password"
          />
          <TextInput
            type="password"
            name="newPassword"
            label={"New Password*"}
            formik={formik}
            placeholder="Enter your new password"
          />
          <TextInput
            disabled={formik.values.newPassword.length < 8}
            type="password"
            name="confirmPassword"
            label={"Confirm New Password*"}
            formik={formik}
            placeholder="Enter your confirm password"
          />
        </div>
      </div>
      <div className={sass.submit}>
        {authenticate.isUpdateLoading ? (
          <div className={sass.loader}>
            <Loader />
          </div>
        ) : (
          <AccentButton disabled={!changed} text={"Update"} type="submit" />
        )}
      </div>
    </form>
  );
};
