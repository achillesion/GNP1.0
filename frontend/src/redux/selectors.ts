import { AppState } from "./store";

export const selectAuthenticate = (state: AppState) => state.authenticate;

export const selectAircraft = (state: AppState) => state.aircraft;

export const selectEntityController = (state: AppState) =>
  state.entityController;

export const selectHangars = (state: AppState) => state.hangars;

export const selectReservations = (state: AppState) => state.reservations;

export const selectSaveNavigation = (state: AppState) => state.saveNavigation;

export const selectPayment = (state: AppState) => state.payment;

export const selectHomeModal = (state: AppState) => state.homeModal;

export const selectHangarReservations = (state: AppState) =>
  state.reservations.hangarReservations;
