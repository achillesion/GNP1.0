import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EntityControllerState } from "../../d";

const initialState: EntityControllerState = {
	isOpenDeleteModal: false,
	entityId: "",
};

const entityControllSlice = createSlice({
	name: "entityControll",
	initialState,
	reducers: {
		setEntityId(state, { payload }: PayloadAction<string>) {
			state.entityId = payload;
		},
		removeEntityId(state) {
			state.entityId = "";
		},
		openModal(state) {
			state.isOpenDeleteModal = true;
		},
		closeModal(state) {
			state.isOpenDeleteModal = false;
		},
	},
});

export const { openModal, closeModal, setEntityId, removeEntityId } =
	entityControllSlice.actions;

export default entityControllSlice.reducer;
