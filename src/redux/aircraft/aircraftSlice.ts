import { createSlice } from "@reduxjs/toolkit";
import {
	createAircraft,
	deleteAircraft,
	updateAircraft,
	fetchAircrafts,
	fetchAllAircrafts,
	findAircraftById,
} from "./operations";
import { AircraftState } from "../../d";

const initialState: AircraftState = {
	isLoading: false,
	isLoadingDelete: false,
	isLoadingUpdate: false,
	isLoadingCreating: false,
	success: false,
	aircrafts: [],
	allAircrafts: [],
	foundAircraft: null,
	meta: null,
	error: null,
};

const aircraftSlice = createSlice({
	name: "hangars",
	initialState,
	reducers: {
		clearAllAircrafts(state) {
			state.allAircrafts = [];
		},
		setSuccess(state) {
			state.success = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAircrafts.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchAircrafts.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.error = null;
				state.aircrafts = payload.result.data;
				state.meta = payload.result.meta;
			})
			.addCase(fetchAircrafts.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.error = payload;
			})
			.addCase(fetchAllAircrafts.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchAllAircrafts.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.error = null;
				state.allAircrafts = payload.result.data;
			})
			.addCase(fetchAllAircrafts.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.error = payload;
			})
			.addCase(createAircraft.pending, (state) => {
				state.isLoadingCreating = true;
			})
			.addCase(createAircraft.fulfilled, (state, { payload }) => {
				state.success = true;
				state.isLoadingCreating = false;
				state.error = null;
				state.aircrafts.push(payload.result.data);
			})
			.addCase(createAircraft.rejected, (state, { payload }) => {
				state.isLoadingCreating = false;
				state.error = payload;
			})
			.addCase(deleteAircraft.pending, (state) => {
				state.isLoadingDelete = true;
			})
			.addCase(deleteAircraft.fulfilled, (state, { payload }) => {
				state.isLoadingDelete = false;
				state.aircrafts = state.aircrafts.filter(
					(aircraft) => aircraft.id !== payload.result.data.id
				);
			})
			.addCase(deleteAircraft.rejected, (state) => {
				state.isLoadingDelete = false;
			})
			.addCase(updateAircraft.pending, (state) => {
				state.isLoadingUpdate = true;
			})
			.addCase(updateAircraft.fulfilled, (state, { payload }) => {
				state.isLoadingUpdate = false;
				state.error = null;

				const findUpdateIndex = state.aircrafts.findIndex(
					(aircraft) => aircraft.id === payload.result.data.id
				);

				state.aircrafts.splice(findUpdateIndex, 1, payload.result.data);
			})
			.addCase(updateAircraft.rejected, (state, { payload }) => {
				state.isLoadingUpdate = false;
				state.error = payload;
			})
			.addCase(findAircraftById.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(findAircraftById.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.error = null;
				state.foundAircraft = payload.result.data;
			})
			.addCase(findAircraftById.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.error = payload;
			});
	},
});

export const { clearAllAircrafts, setSuccess } = aircraftSlice.actions;
export default aircraftSlice.reducer;
