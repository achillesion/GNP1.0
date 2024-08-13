import { useSelector } from "react-redux";
import { AppState } from "../redux/store";
import {
  selectAuthenticate,
  selectAircraft,
  selectEntityController,
  selectHangars,
  selectReservations,
  selectSaveNavigation,
  selectPayment,
  selectHomeModal,
} from "../redux/selectors";

export const useAppState = (): AppState => ({
  homeModal: useSelector(selectHomeModal),
  authenticate: useSelector(selectAuthenticate),
  aircraft: useSelector(selectAircraft),
  entityController: useSelector(selectEntityController),
  hangars: useSelector(selectHangars),
  reservations: useSelector(selectReservations),
  saveNavigation: useSelector(selectSaveNavigation),
  payment: useSelector(selectPayment),
  //   hangarReservations: useSelector(selectHangarReservations),
});
