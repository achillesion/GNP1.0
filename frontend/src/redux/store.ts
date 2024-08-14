import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import axios from "axios";

import authenticateReducer, { logout } from "./authenticate/authSlice";
import {
  login,
  refresh,
  register,
  updateUser,
  uploadAvatar,
} from "./authenticate/operations";
import aircraftReducer, {
  clearAllAircrafts,
  setSuccess,
} from "./aircraft/aircraftSlice";
import {
  createAircraft,
  deleteAircraft,
  fetchAllAircrafts,
  findAircraftById,
  updateAircraft,
} from "./aircraft/operations";
import { fetchAircrafts } from "./aircraft/operations";
import deleteControllerReducer, {
  closeModal,
  openModal,
  removeEntityId,
  setEntityId,
} from "./entityController/entityControllSlice";
import hangarsReducer, {
  clearGalery,
  clearHangars,
  clearSearchHangars,
  setSearchInfo,
  setSuccessHangars,
} from "./hangars/hangarsSlice";
import {
  createHangar,
  fetchGalery,
  fetchHangars,
  findHangarById,
  searchHangarsByDate,
  updateHangar,
  uploadHangarPhoto,
} from "./hangars/operations";
import reservationsReducer, {
  clearReservation,
  setReservation,
  toggleReservations,
} from "./reservations/reservationsSlice";
import {
  createCustomer,
  createPlan,
  createPrice,
  createProduct,
  createReservation,
  createSession,
  deleteReservation,
  fetchIntent,
  fetchReservations,
  findReservationById,
  updateReservation,
} from "./reservations/operations";
import saveNavigationReducer, {
  setRoute,
} from "./saveNavigation/saveNavigationSlice";
import paymentReducer, {
  clearPayment,
  setPaymentAmount,
  setPaymentMethod,
  setUserPaymentName,
} from "./payment/paymentSlice";
import {
  createPaymentInfo,
  deletePaymentInfo,
  fetchPaymentInfo,
  updatePaymentInfo,
} from "./payment/operations";
import chatReducer, { addMessage, setMessages } from "./chat/chatSlice";

import homeReducer, { setHomeModal } from "./home/homeControllSlice";

const { REACT_APP_BASE_URL } = process.env;

axios.defaults.baseURL = `${REACT_APP_BASE_URL}`;

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "searchFrom",
    "searchTo",
    "saveRoute",
    "payment",
    "isLoggedIn",
    "selectedReservation",
  ],
};

const reducer = combineReducers({
  homeModal: homeReducer,
  authenticate: persistReducer(persistConfig, authenticateReducer),
  aircraft: aircraftReducer,
  entityController: deleteControllerReducer,
  hangars: persistReducer(persistConfig, hangarsReducer),
  reservations: persistReducer(persistConfig, reservationsReducer),
  saveNavigation: persistReducer(persistConfig, saveNavigationReducer),
  payment: persistReducer(persistConfig, paymentReducer),
  chat: chatReducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {
  login,
  register,
  refresh,
  logout,
  updateUser,
  fetchAircrafts,
  createAircraft,
  openModal,
  closeModal,
  deleteAircraft,
  setEntityId,
  removeEntityId,
  updateAircraft,
  fetchHangars,
  createHangar,
  updateHangar,
  fetchReservations,
  toggleReservations,
  createReservation,
  fetchAllAircrafts,
  clearAllAircrafts,
  setSuccess,
  searchHangarsByDate,
  setSearchInfo,
  setRoute,
  deleteReservation,
  updateReservation,
  setPaymentMethod,
  uploadAvatar,
  uploadHangarPhoto,
  fetchGalery,
  fetchPaymentInfo,
  updatePaymentInfo,
  createPaymentInfo,
  deletePaymentInfo,
  setUserPaymentName,
  setPaymentAmount,
  clearPayment,
  clearHangars,
  clearGalery,
  setSuccessHangars,
  clearSearchHangars,
  findReservationById,
  findAircraftById,
  findHangarById,
  fetchIntent,
  createProduct,
  createPlan,
  createCustomer,
  createPrice,
  createSession,
  setReservation,
  clearReservation,
  setHomeModal,
  addMessage,
  setMessages,
};
