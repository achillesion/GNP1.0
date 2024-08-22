import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import {
	DeletePaymentInfoResponse,
	FetchPaymentInfoResponse,
	InitialPaymentInfoValues,
	UpdatePaymentValues,
} from "../../d";
import { getErrorMessage } from "../../utils";
import { toast } from "react-toastify";

export const fetchPaymentInfo = createAsyncThunk<FetchPaymentInfoResponse>(
	"fetchPaymentInfo",
	async (_, { rejectWithValue }) => {
		try {
			const response: AxiosResponse<FetchPaymentInfoResponse> = await axios.get(
				"payments/users"
			);

			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const createPaymentInfo = createAsyncThunk<
	FetchPaymentInfoResponse,
	InitialPaymentInfoValues
>("createPaymentInfo", async (paymentInfo, { rejectWithValue }) => {
	try {
		const response: AxiosResponse<FetchPaymentInfoResponse> = await axios.post(
			"payments",
			paymentInfo
		);

		toast.success("Payment information created!");

		return response.data;
	} catch (error: any) {
		toast.error(getErrorMessage(error.response.data.message));
		return rejectWithValue(error);
	}
});

export const updatePaymentInfo = createAsyncThunk<
	FetchPaymentInfoResponse,
	UpdatePaymentValues
>("updatePaymentInfo", async (paymentInfo, { rejectWithValue }) => {
	try {
		const { id, ...data } = paymentInfo;

		const response: AxiosResponse<FetchPaymentInfoResponse> = await axios.patch(
			`payments/${id}`,
			data
		);

		toast.success("Payment information updated!");

		return response.data;
	} catch (error: any) {
		toast.error(getErrorMessage(error.response.data.message));
		return rejectWithValue(error);
	}
});

export const deletePaymentInfo = createAsyncThunk<
	DeletePaymentInfoResponse,
	string
>("deletePaymentInfo", async (id, { rejectWithValue }) => {
	try {
		const response = await axios.delete(`payments/${id}`);

		toast.info("Payment information delete success!");

		return response.data;
	} catch (error: any) {
		toast.error(getErrorMessage(error.response.data.message));
		return rejectWithValue(error);
	}
});
