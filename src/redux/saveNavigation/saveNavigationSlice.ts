import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SaveNavigationState } from "../../d";

const initialState: SaveNavigationState = {
	saveRoute: "",
};

const saveNavigationSlice = createSlice({
	name: "saveNavigation",
	initialState,
	reducers: {
		setRoute(state, { payload }: PayloadAction<string>) {
			state.saveRoute = payload;
		},
	},
});

export const { setRoute } = saveNavigationSlice.actions;
export default saveNavigationSlice.reducer;
