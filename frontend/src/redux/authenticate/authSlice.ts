import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthenticateState } from "../../d";
import {
	register,
	login,
	refresh,
	updateUser,
	uploadAvatar,
} from "./operations";
import { CookiesApi } from "../../utils";

const initialState: AuthenticateState = {
	isLoggedIn: true,
	isLoading: false,
	isUpdateLoading: false,
	isRefreshing: false,
	user: null,
	tokens: null,
	error: null,
};

const authSlice = createSlice({
	name: "authenticate",
	initialState,
	reducers: {
		logout(state) {
			state.isLoggedIn = false;
			CookiesApi.setValue("refreshToken", null);
			state.tokens = null;
			state.user = null;
			axios.defaults.headers.common.Authorization = "";
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.error = null;
				state.tokens = payload.result.data.tokens;
				state.user = payload.result.data.user;
				state.isLoggedIn = true;
			})
			.addCase(register.rejected, (state) => {
				state.isLoading = false;
				state.user = null;
				state.isLoggedIn = false;
			})
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.error = null;
				state.tokens = payload.result.data.tokens;
				state.user = payload.result.data.user;
				state.isLoggedIn = true;
			})
			.addCase(login.rejected, (state) => {
				state.isLoading = false;
				state.user = null;
				state.tokens = null;
				state.isLoggedIn = false;
			})
			.addCase(refresh.pending, (state) => {
				state.isRefreshing = true;
			})
			.addCase(refresh.fulfilled, (state, { payload }) => {
				state.isRefreshing = false;
				state.error = null;
				state.tokens = payload.result.data.tokens;
				state.user = payload.result.data.user;
				state.isLoggedIn = true;
			})
			.addCase(refresh.rejected, (state) => {
				state.isRefreshing = false;
				state.tokens = null;
				state.isLoggedIn = false;
			})
			.addCase(updateUser.pending, (state) => {
				state.isUpdateLoading = true;
			})
			.addCase(updateUser.fulfilled, (state, { payload }) => {
				state.isUpdateLoading = false;
				state.error = null;
				state.user = payload.result.data.user;
			})
			.addCase(updateUser.rejected, (state) => {
				state.isUpdateLoading = false;
			})
			.addCase(uploadAvatar.pending, (state) => {
				state.isUpdateLoading = true;
			})
			.addCase(uploadAvatar.fulfilled, (state, { payload }) => {
				state.isUpdateLoading = false;
				state.error = null;
				state.user!.avatar = payload.result.data;
			})
			.addCase(uploadAvatar.rejected, (state, { payload }) => {
				state.isUpdateLoading = false;
				state.error = payload;
			});
	},
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
