import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { FormatterDate, getErrorMessage } from "../../utils";
import {
	FetchHangarsResponse,
	CreateHangarValues,
	HangarsResponse,
	DeleteResponse,
	UpdateHangarValues,
	SearchHangarsValues,
	FetchSearchHangarsResponse,
	UploadHangarImageResponse,
} from "../../d";

type PaginationSettings = {
	page?: number;
	take?: number;
};

type GalerySettings = {
	signal: AbortSignal;
} & PaginationSettings;

export const fetchHangars = createAsyncThunk<
	FetchHangarsResponse,
	PaginationSettings
>("fetchHangars", async ({ page = 1, take = 5 }, { rejectWithValue }) => {
	try {
		const response: AxiosResponse<FetchHangarsResponse> = await axios.get(
			`hangars/users?page=${page}&take=${take}`
		);

		return response.data;
	} catch (error: any) {
		return rejectWithValue(error);
	}
});

export const fetchGalery = createAsyncThunk<
	FetchHangarsResponse,
	GalerySettings
>("fetchGalery", async ({ page, take, signal }, { rejectWithValue }) => {
	try {
		const response: AxiosResponse<FetchHangarsResponse> = await axios.get(
			`hangars?page=${page}&take=${take}`,
			{ signal }
		);

		return response.data;
	} catch (error: any) {
		toast.error(getErrorMessage(error.response.data.message));
		return rejectWithValue(error);
	}
});

export const createHangar = createAsyncThunk<
	HangarsResponse,
	CreateHangarValues
>("createHangar", async (hangar, { rejectWithValue }) => {
	try {
		const formData = new FormData();

		formData.append("airportIdentifier", hangar.airportIdentifier);
		formData.append(
			"vacancyStartDate",
			`${FormatterDate.formatDate({ dateString: hangar.vacancyStartDate })}`
		);
		formData.append(
			"vacancyEndDate",
			`${FormatterDate.formatDate({ dateString: hangar.vacancyEndDate })}`
		);
		if(hangar.blockOffStartDate) formData.append(
			"blockOffStartDate",
			`${FormatterDate.formatDate({ dateString: hangar.blockOffStartDate })}`
		);
		if(hangar.blockOffEndDate) formData.append(
			"blockOffEndDate",
			`${FormatterDate.formatDate({ dateString: hangar.blockOffEndDate })}`
		);
		if(hangar.length) formData.append("length", hangar.length);
		if(hangar.heated) formData.append("heated", hangar.heated);
		if(hangar.cameras) formData.append("cameras", hangar.cameras);
		if(hangar.description) formData.append("description", hangar.description);
		if(hangar.doorHeight) formData.append("doorHeight", hangar.doorHeight);
		if(hangar.doorWidth) formData.append("doorWidth", hangar.doorWidth);
		if(hangar.livingQuarters) formData.append("livingQuarters", hangar.livingQuarters);
		if(hangar.photo) formData.append("image", hangar.photo!);
		formData.append("photo", '');
		formData.append("price", hangar.price);
		formData.append("title", hangar.title);
		if(hangar.accessType) formData.append("accessType", hangar.accessType);
		if(hangar.width) formData.append("width", hangar.width);

		const response: AxiosResponse<HangarsResponse> = await axios.post(
			"hangars",
			formData,
		);
		
		toast.success("Hangar created success!");
		return response.data;
	} catch (error: any) {
		toast.error(getErrorMessage(error.response.data.message));
		return rejectWithValue(error);
	}
});

export const deleteHangar = createAsyncThunk<DeleteResponse, string>(
	"deleteHangar",
	async (id, { rejectWithValue }) => {
		try {
			const response: AxiosResponse<DeleteResponse> = await axios.delete(
				`hangars/${id}`
			);

			toast.info("Hangar deleted success!");

			return {
				...response.data,
				result: {
					data: {
						id,
					},
				},
			};
		} catch (error: any) {
			toast.error(getErrorMessage(error.response.data.message));
			return rejectWithValue(error);
		}
	}
);

export const updateHangar = createAsyncThunk<
	HangarsResponse,
	UpdateHangarValues
>("updateHangar", async (hangar, { rejectWithValue }) => {
	try {
		const {
			id,
			vacancyStartDate,
			vacancyEndDate,
			blockOffStartDate,
			blockOffEndDate,
			...restHangar
		} = hangar;

		const entries = Object.entries(restHangar);
		const filteredEntries = entries.filter(([key, value]) => value !== '');
		const filteredObj = Object.fromEntries(filteredEntries);
		console.log(filteredObj, 'xxxxx')

		const body = {
			...filteredObj,
			vacancyStartDate: `${FormatterDate.formatDate({
				dateString: vacancyStartDate,
			})}`,
			vacancyEndDate: `${FormatterDate.formatDate({
				dateString: vacancyEndDate,
			})}`,
			// blockOffStartDate: `${FormatterDate.formatDate({
			// 	dateString: blockOffStartDate,
			// })}`,
			// blockOffEndDate: `${FormatterDate.formatDate({
			// 	dateString: blockOffEndDate,
			// })}`,
		};


		const response: AxiosResponse<HangarsResponse> = await axios.patch(
			`hangars/${id}`,
			body
		);

		toast.success("Hangar update success!");

		return response.data;
	} catch (error: any) {
		toast.error(getErrorMessage(error.response.data.message));
		return rejectWithValue(error);
	}
});

export const searchHangarsByDate = createAsyncThunk<
	FetchSearchHangarsResponse,
	SearchHangarsValues
>("searchHangarsByDate", async ({ from, to, identifier }, { rejectWithValue }) => {
	try {
		const response: AxiosResponse<FetchSearchHangarsResponse> = await axios.get(
			`hangars?from=${FormatterDate.formatDate({
				dateString: from,
			})}&to=${FormatterDate.formatDate({ dateString: to })}&identifier=${identifier}`
		);

		return response.data;
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const uploadHangarPhoto = createAsyncThunk<
	UploadHangarImageResponse,
	{ photo: File | string; id: string }
>("uploadHangarPhoto", async ({ photo, id }, { rejectWithValue }) => {
	try {
		const formData = new FormData();

		formData.append("file", photo as unknown as File);

		const response = await axios.post(`hangars/${id}/images/upload`, formData);

		return response.data;
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const findHangarById = createAsyncThunk<HangarsResponse, string>(
	"findHangarById",
	async (id, { rejectWithValue }) => {
		try {
			const response = await axios.get(`hangars/${id}`);
			return response.data;
		} catch (error: any) {
			// toast.error(getErrorMessage(error.response.data.message));
			return rejectWithValue(error);
		}
	}
);
