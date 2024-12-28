import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PaymentMethods, PaymentState } from "./../../d";
import {
  createPaymentInfo,
  deletePaymentInfo,
  fetchPaymentInfo,
  updatePaymentInfo,
} from "./operations";

const initialState: PaymentState = {
  payment: "paypal",
  isLoading: false,
  isCreatingLoading: false,
  isUpdatingLoading: false,
  isDeletingLoading: false,
  paymentInfo: null,
  error: null,
  successPaymentUserInfo: "",
  paymentAmount: 0.1,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPaymentMethod(state, { payload }: PayloadAction<PaymentMethods>) {
      state.payment = payload;
    },
    setUserPaymentName(state, { payload }: PayloadAction<string>) {
      state.successPaymentUserInfo = payload;
    },
    setPaymentAmount(state, { payload }: PayloadAction<number>) {
      state.paymentAmount = payload;
    },
    clearPayment(state) {
      state.successPaymentUserInfo = "";
      state.paymentAmount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaymentInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPaymentInfo.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.paymentInfo = payload.result?.data;
      })
      .addCase(fetchPaymentInfo.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(createPaymentInfo.pending, (state) => {
        state.isCreatingLoading = true;
      })
      .addCase(createPaymentInfo.fulfilled, (state, { payload }) => {
        state.isCreatingLoading = false;
        state.error = null;
        state.paymentInfo = payload.result.data;
      })
      .addCase(createPaymentInfo.rejected, (state, { payload }) => {
        state.isCreatingLoading = false;
        state.error = payload;
      })
      .addCase(updatePaymentInfo.pending, (state) => {
        state.isUpdatingLoading = true;
      })
      .addCase(updatePaymentInfo.fulfilled, (state, { payload }) => {
        state.isUpdatingLoading = false;
        state.error = null;
        state.paymentInfo = payload.result.data;
      })
      .addCase(updatePaymentInfo.rejected, (state, { payload }) => {
        state.isUpdatingLoading = false;
        state.error = payload;
      })
      .addCase(deletePaymentInfo.pending, (state) => {
        state.isDeletingLoading = true;
      })
      .addCase(deletePaymentInfo.fulfilled, (state) => {
        state.isDeletingLoading = false;
        state.error = null;
        state.paymentInfo = null;
      })
      .addCase(deletePaymentInfo.rejected, (state, { payload }) => {
        state.isDeletingLoading = false;
        state.error = payload;
      });
  },
});

export const {
  setPaymentMethod,
  setUserPaymentName,
  setPaymentAmount,
  clearPayment,
} = paymentSlice.actions;
export default paymentSlice.reducer;
