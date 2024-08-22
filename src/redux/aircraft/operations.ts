import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import {
	Aircraft,
	AircraftResponse,
	CreateAircraftValues,
	DeleteResponse,
	FetchAircraftResponse,
} from "../../d";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../utils";

export const fetchAircrafts = createAsyncThunk<
	FetchAircraftResponse,
	number | undefined
>("fetchAircrafts", async (page, { rejectWithValue }) => {
	const url =
		page === undefined
			? "aircrafts/users"
			: `aircrafts/users?page=${page}&take=5`;

	try {
		const response: AxiosResponse<FetchAircraftResponse> = await axios.get(url);

		return response.data;
	} catch (error: any) {
		return rejectWithValue(error);
	}
});

export const fetchAllAircrafts = createAsyncThunk<FetchAircraftResponse>(
	"fetchAllAircrafts",
	async (_, { rejectWithValue }) => {
		try {
			const response: AxiosResponse<FetchAircraftResponse> = await axios.get(
				"aircrafts"
			);

			return response.data;
		} catch (error: any) {
			toast.error('getErrorMessage(error.response.data.message)');
			return rejectWithValue(error);
		}
	}
);

export const createAircraft = createAsyncThunk<
	AircraftResponse,
	CreateAircraftValues & { owner: string }
>("createAircraft", async (data, { rejectWithValue }) => {
	try {
		const response: AxiosResponse<AircraftResponse> = await axios.post(
			"aircrafts",
			{
				...data,
				year: Number(data.year),
			}
		);

		toast.success("Your aircraft created!");

		return response.data;
	} catch (error: any) {
		toast.error(getErrorMessage(error.response.data.message));
		return rejectWithValue(error);
	}
});

export const deleteAircraft = createAsyncThunk<DeleteResponse, string>(
	"deleteAircraft",
	async (id, { rejectWithValue }) => {
		try {
			const response: AxiosResponse<DeleteResponse> = await axios.delete(
				`aircrafts/${id}`
			);

			toast.info("Aircraft delete success!");

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

export const updateAircraft = createAsyncThunk<AircraftResponse, Aircraft>(
	"updateAircraft",
	async (aircraft, { rejectWithValue }) => {
		try {
			const { id, ...aircraftData } = aircraft;

			const response: AxiosResponse<AircraftResponse> = await axios.patch(
				`aircrafts/${id}`,
				{
					...aircraftData,
					year: Number(aircraftData.year),
				}
			);

			toast.success("Aircraft update success!");

			return response.data;
		} catch (error: any) {
			toast.error('getErrorMessage(error.response.data.message)');
			return rejectWithValue(error);
		}
	}
);

export const findAircraftById = createAsyncThunk<AircraftResponse, string>(
	"findAircraftById",
	async (id, { rejectWithValue }) => {
		try {
			const response = await axios(`aircrafts/${id}`);
			return response.data;
		} catch (error: any) {
			// toast.error(getErrorMessage(error.response.data.message));
			return rejectWithValue(error);
		}
	}
);
