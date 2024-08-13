import { createSlice } from "@reduxjs/toolkit";
import { HomeControllerState } from "../../d";

const initialState: HomeControllerState = {
	isOpen: false,

};

const homeControllSlice = createSlice({
	name: "homeModal",
	initialState,
	reducers: {
		setHomeModal(state, { payload }) {
			state.isOpen = payload;
		},
	},
});

export const { setHomeModal } =
homeControllSlice.actions;

export default homeControllSlice.reducer;
