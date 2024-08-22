import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HangarsState } from "../../d";
import {
	createHangar,
	deleteHangar,
	fetchGalery,
	fetchHangars,
	findHangarById,
	searchHangarsByDate,
	updateHangar,
	uploadHangarPhoto,
} from "./operations";

type SearchValues = {
	info: "searchFrom" | "searchTo" | "identifier";
	value: string;
};

const initialState: HangarsState = {
	isLoading: false,
	isUpdatingHangar: false,
	isDeletingHangar: false,
	isCreatingHangar: false,
	isSearchLoading: false,
	success: false,
	searchFrom: "",
	searchTo: "",
	identifier: "",
	hangars: [],
	galery: [],
	searchHangars: [],
	foundHangar: null,
	meta: null,
	error: null,
};

const hangarsSlice = createSlice({
	name: "hangars",
	initialState,
	reducers: {
		setSearchInfo(state, { payload }: PayloadAction<SearchValues>) {
			state[payload.info] = payload.value;
		},
		clearHangars(state) {
			state.hangars = [];
		},
		clearGalery(state) {
			state.galery = [];
		},
		clearSearchHangars(state) {
			state.searchHangars = [];
		},
		setSuccessHangars(state, { payload }) {
			state.success = payload;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchHangars.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchHangars.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.error = null;
				state.hangars = payload.result.data;
				state.meta = payload.result.meta;
			})
			.addCase(fetchHangars.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.error = payload;
			})
			.addCase(createHangar.pending, (state) => {
				state.isCreatingHangar = true;
			})
			.addCase(createHangar.fulfilled, (state, { payload }) => {
				state.isCreatingHangar = false;
				state.success = true;
				state.error = null;
				state.hangars.push(payload.result.data);
			})
			.addCase(createHangar.rejected, (state, { payload }) => {
				state.isCreatingHangar = false;
				state.error = payload;
			})
			.addCase(deleteHangar.pending, (state) => {
				state.isDeletingHangar = true;
			})
			.addCase(deleteHangar.fulfilled, (state, { payload }) => {
				state.isDeletingHangar = false;
				state.error = null;
				state.hangars = state.hangars.filter(
					(hangar) => hangar.id !== payload.result.data.id
				);
			})
			.addCase(deleteHangar.rejected, (state, { payload }) => {
				state.isDeletingHangar = false;
				state.error = payload;
			})
			.addCase(updateHangar.pending, (state) => {
				state.isUpdatingHangar = true;
			})
			.addCase(updateHangar.fulfilled, (state, { payload }) => {
				state.isUpdatingHangar = false;
				state.error = null;
				state.success = true;

				const findUpdateIndex = state.hangars.findIndex(
					(hangar) => hangar.id === payload.result.data.id
				);

				if (findUpdateIndex >= 0) {
					state.hangars.splice(findUpdateIndex, 1, payload.result.data);
				}
			})
			.addCase(updateHangar.rejected, (state, { payload }) => {
				state.isUpdatingHangar = false;
				state.error = payload;
			})
			.addCase(searchHangarsByDate.pending, (state) => {
				state.isSearchLoading = true;
			})
			.addCase(searchHangarsByDate.fulfilled, (state, { payload }) => {
				state.isSearchLoading = false;
				state.error = null;
				state.searchHangars = payload.result.data;
				state.meta = payload.result.meta;
			})
			.addCase(searchHangarsByDate.rejected, (state, { payload }) => {
				state.isSearchLoading = false;
				state.error = payload;
			})
			.addCase(uploadHangarPhoto.pending, (state) => {
				state.isUpdatingHangar = true;
			})
			.addCase(uploadHangarPhoto.fulfilled, (state, { payload }) => {
				state.isUpdatingHangar = false;
				state.error = null;

				const findUpdateHangarIndex = state.hangars.findIndex(
					(hangar) => hangar.id === payload.result.data.id
				);

				if (findUpdateHangarIndex >= 0) {
					state.hangars.splice(findUpdateHangarIndex, 1, payload.result.data);
				}
			})
			.addCase(uploadHangarPhoto.rejected, (state, { payload }) => {
				state.isUpdatingHangar = false;
				state.error = payload;
			})
			.addCase(fetchGalery.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchGalery.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.error = null;
				state.galery.push(...payload.result.data);
				state.meta = payload.result.meta;
			})
			.addCase(fetchGalery.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.error = payload;
			})
			.addCase(findHangarById.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(findHangarById.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.error = null;
				state.foundHangar = payload.result.data;
			})
			.addCase(findHangarById.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.error = payload;
			});
	},
});

export const { setSearchInfo, clearHangars, clearGalery, clearSearchHangars, setSuccessHangars } =
	hangarsSlice.actions;
export default hangarsSlice.reducer;
