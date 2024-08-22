import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	LogInValues,
	LoginResponse,
	RegisterValues,
	UpdateUserResponse,
	UpdateValues,
	UploadAvatarResponse,
	User,
} from "../../d";
import { AppState } from "../store";
import axios, { AxiosResponse } from "axios";
import { CookiesApi, getErrorMessage } from "../../utils";
import { toast } from "react-toastify";

const setAuthHeader = (token: string) => {
	axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const register = createAsyncThunk<LoginResponse, RegisterValues>(
	"register",
	async (info, { rejectWithValue }) => {
		try {
			const response: AxiosResponse<LoginResponse> = await axios.post(
				"auth/register",
				info
			);

			setAuthHeader(response.data.result.data.tokens.accessToken);

			CookiesApi.setValue(
				"refreshToken",
				response.data.result.data.tokens.refreshToken
			);

			toast.success("Register Success!");

			return response.data;
		} catch (error: any) {
			toast.error(getErrorMessage(error.response.data.message));
			return rejectWithValue(error);
		}
	}
);

export const login = createAsyncThunk<LoginResponse, LogInValues>(
	"login",
	async (data, { rejectWithValue }) => {
		try {
			const response: AxiosResponse<LoginResponse> = await axios.post(
				"auth/login",
				data
			);

			setAuthHeader(response.data.result.data.tokens.accessToken);

			CookiesApi.setValue(
				"refreshToken",
				response.data.result.data.tokens.refreshToken
			);

			toast.success("Login Success!");

			return response.data;
		} catch (error: any) {
			console.warn(error);
			toast.error(getErrorMessage(error.response.data.message));
			return rejectWithValue(error);
		}
	}
);

export const refresh = createAsyncThunk<LoginResponse>(
	"refresh",
	async (_, { rejectWithValue, getState }) => {
		const { authenticate } = getState() as AppState;

		const refreshToken = CookiesApi.getValue("refreshToken");

		if (refreshToken === undefined) return rejectWithValue(authenticate);

		setAuthHeader(refreshToken);

		try {
			const response: AxiosResponse<LoginResponse> = await axios.post(
				"auth/refresh"
			);

			CookiesApi.setValue(
				"refreshToken",
				response.data.result.data.tokens.refreshToken
			);
			setAuthHeader(response.data.result.data.tokens.accessToken);

			return response.data;
		} catch (error: any) {
			return rejectWithValue(authenticate);
		}
	}
);

export const updateUser = createAsyncThunk<
	UpdateUserResponse,
	UpdateValues & User
>("updateUser", async (updateUser, { rejectWithValue }) => {
	try {
		const response: AxiosResponse<UpdateUserResponse> = await axios.patch(
			`users/${updateUser.id}`,
			{
				name: updateUser.name,
				financialInfo: updateUser.financialInfo,
				email: updateUser.email,
				phone: updateUser.phone,
				country: updateUser.country,
				state: updateUser.state,
				city: updateUser.city,
				password: updateUser.password,
				newPassword: updateUser.newPassword,
				confirmPassword: updateUser.confirmPassword,
			}
		);

		toast.success("Personal info updated successfuly!");

		return response.data;
	} catch (error: any) {
		toast.error(getErrorMessage(error.response.data.message));
		return rejectWithValue(error);
	}
});

export const uploadAvatar = createAsyncThunk<UploadAvatarResponse, File>(
	"uploadAvatar",
	async (image, { rejectWithValue }) => {
		try {
			const formData = new FormData();

			formData.append("image", image);

			const response = await axios.post("users/images/upload", formData);

			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);
