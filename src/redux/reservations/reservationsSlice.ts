import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CreateReservationValues, ReservationsState } from "../../d";
import {
  createPlan,
  createPrice,
  createProduct,
  createReservation,
  createSession,
  deleteReservation,
  //   fetchHangarsReservations,
  fetchIntent,
  fetchReservations,
  findReservationById,
  updateReservation,
} from "./operations";

const initialState: ReservationsState = {
  isLoading: false,
  isCreatingReservation: false,
  isDeletingReservation: false,
  isUpdatingReservation: false,
  isFetchingIntent: false,
  isCreatingSubscription: false,
  reservations: [],
  hangarReservations: [], // New property for hangar reservations
  foundReservation: null,
  meta: null,
  error: null,
  isCurrentReservations: true,
  clientSecret: "",
  productId: "",
  productName: "",
  planId: "",
  priceId: "",
  customer: "",
  subscription: "",
  success_url: "",
  url: "",
  selectedReservation: null,
};

const reservationsSlice = createSlice({
  name: "reservations",
  initialState,
  reducers: {
    toggleReservations(state) {
      state.isCurrentReservations = !state.isCurrentReservations;
    },
    setReservation(state, { payload }: PayloadAction<CreateReservationValues>) {
      state.selectedReservation = payload;
    },
    clearReservation(state) {
      state.selectedReservation = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchReservations.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.reservations = payload.result.data;
        state.meta = payload.result.meta;
      })
      .addCase(fetchReservations.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(createReservation.pending, (state) => {
        state.isCreatingReservation = true;
      })
      .addCase(createReservation.fulfilled, (state, { payload }) => {
        state.isCreatingReservation = false;
        state.error = null;
      })
      .addCase(createReservation.rejected, (state, { payload }) => {
        state.isCreatingReservation = false;
        state.error = payload;
      })
      .addCase(deleteReservation.pending, (state) => {
        state.isDeletingReservation = true;
      })
      .addCase(deleteReservation.fulfilled, (state, { payload }) => {
        state.isDeletingReservation = false;
        state.error = null;
        state.reservations = state.reservations.filter(
          (reservation) => reservation.id !== payload.result.data.id
        );
      })
      .addCase(deleteReservation.rejected, (state, { payload }) => {
        state.isDeletingReservation = false;
        state.error = payload;
      })
      .addCase(updateReservation.pending, (state) => {
        state.isUpdatingReservation = true;
      })
      .addCase(updateReservation.fulfilled, (state, { payload }) => {
        state.isUpdatingReservation = false;
        state.error = null;

        const findUpdateIndex = state.reservations.findIndex(
          (reservation) => reservation.id === payload.result.data.id
        );

        if (findUpdateIndex >= 0) {
          state.reservations.splice(findUpdateIndex, 1, payload.result.data);
        }
      })
      .addCase(updateReservation.rejected, (state, { payload }) => {
        state.isUpdatingReservation = false;
        state.error = payload;
      })
      .addCase(findReservationById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(findReservationById.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.foundReservation = payload.result.data;
      })
      .addCase(findReservationById.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(fetchIntent.pending, (state) => {
        state.isFetchingIntent = true;
      })
      .addCase(fetchIntent.fulfilled, (state, { payload }) => {
        state.isFetchingIntent = false;
        state.error = null;
        state.clientSecret = payload.result.data.client_secret;
      })
      .addCase(fetchIntent.rejected, (state, { payload }) => {
        state.isFetchingIntent = false;
        state.error = payload;
      })
      .addCase(createProduct.pending, (state) => {
        state.isCreatingSubscription = true;
      })
      .addCase(createProduct.fulfilled, (state, { payload }) => {
        state.isCreatingSubscription = false;
        state.error = null;
        state.productId = payload.result.data.id;
        state.productName = payload.result.data?.name || "";
      })
      .addCase(createProduct.rejected, (state, { payload }) => {
        state.isCreatingSubscription = false;
        state.error = payload;
      })
      .addCase(createPlan.pending, (state) => {
        state.isCreatingSubscription = true;
      })
      .addCase(createPlan.fulfilled, (state, { payload }) => {
        state.isCreatingSubscription = false;
        state.error = null;
        state.planId = payload.result.data.id;
      })
      .addCase(createPlan.rejected, (state, { payload }) => {
        state.isCreatingSubscription = false;
        state.error = payload;
      })
      .addCase(createPrice.pending, (state) => {
        state.isCreatingSubscription = true;
      })
      .addCase(createPrice.fulfilled, (state, { payload }) => {
        state.isCreatingSubscription = false;
        state.error = null;
        state.priceId = payload.result.data.id;
      })
      .addCase(createPrice.rejected, (state, { payload }) => {
        state.isCreatingSubscription = false;
        state.error = payload;
      })
      .addCase(createSession.pending, (state) => {
        state.isCreatingSubscription = true;
      })
      .addCase(createSession.fulfilled, (state, { payload }) => {
        state.isCreatingSubscription = false;
        state.error = null;
        state.success_url = payload.result.data.success_url!;
        state.url = payload.result.data.url!;
      })
      .addCase(createSession.rejected, (state, { payload }) => {
        state.isCreatingSubscription = false;
        state.error = payload;
      });
    //   .addCase(fetchHangarsReservations.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(fetchHangarsReservations.fulfilled, (state, { payload }) => {
    //     state.isLoading = false;
    //     state.error = null;
    //     // Concatenate or set the hangar reservations to the existing array
    //     state.hangarReservations = payload.result.data;
    //     state.meta = payload.result.meta;
    //   })
    //   .addCase(fetchHangarsReservations.rejected, (state, { payload }) => {
    //     state.isLoading = false;
    //     state.error = payload;
    //   });
  },
});

export const { toggleReservations, setReservation, clearReservation } =
  reservationsSlice.actions;
export default reservationsSlice.reducer;
