import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { FormatterDate, getErrorMessage } from "../../utils";
import { toast } from "react-toastify";
import {
  ReservationResponse,
  CreateReservationValues,
  DeleteResponse,
  FetchReservationResponse,
  UpdateReservation,
  FetchIntentParams,
  FetchIntentResponse,
  CreateCustomerValues,
  CreateSubscriptionValues,
  CreateCustomerResponse,
  CreatePlanValues,
  CreateSubscriptionResponse,
  CreatePriceValues,
} from "../../d";

export const fetchReservations = createAsyncThunk<
  FetchReservationResponse,
  number
>("fetchReservations", async (page, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<FetchReservationResponse> = await axios.get(
      `reservations/users?page=${page}&take=5`
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

// export const fetchHangarsReservations = createAsyncThunk<
//   FetchReservationResponse,
//   number
// >("fetchHangarReservations", async (page, { rejectWithValue }) => {
//   try {
//     const response: AxiosResponse<FetchReservationResponse> = await axios.get(
//       `/reservations/myHangars?skip=${page - 1}&take=5`
//     );

//     return response.data;
//   } catch (error: any) {
//     return rejectWithValue(error);
//   }
// });

export const createReservation = createAsyncThunk<
  ReservationResponse,
  CreateReservationValues
>("createReservation", async (reservation, { rejectWithValue }) => {
  try {
    const { startTime, endTime, ...restReservation } = reservation;

    const data = {
      ...restReservation,
      startTime: FormatterDate.formatDate({ dateString: startTime }).split(
        " "
      )[0],
      endTime: FormatterDate.formatDate({ dateString: endTime }).split(" ")[0],
    };

    const response: AxiosResponse<ReservationResponse> = await axios.post(
      "reservations",
      data
    );

    toast.success("Reservation created!");

    return response.data;
  } catch (error: any) {
    toast.error(getErrorMessage(error.response.data.message));
    return rejectWithValue(error);
  }
});

export const deleteReservation = createAsyncThunk<DeleteResponse, string>(
  "deleteReservation",
  async (id, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<DeleteResponse> = await axios.delete(
        `reservations/${id}`
      );

      toast.info("Reservation delete success!");

      return {
        ...response.data,
        result: {
          data: {
            id,
          },
        },
      };
    } catch (error: any) {
      toast.error(getErrorMessage(error.response.data.message));
      return rejectWithValue(error);
    }
  }
);

export const updateReservation = createAsyncThunk<
  ReservationResponse,
  UpdateReservation
>("updateReservation", async (reservation, { rejectWithValue }) => {
  try {
    const { id, ...data } = reservation;

    const response: AxiosResponse<ReservationResponse> = await axios.patch(
      `reservations/${id}`,
      data
    );

    toast.success("Reservation update success!");

    return response.data;
  } catch (error: any) {
    toast.error(getErrorMessage(error.response.data.message));
    return rejectWithValue(error);
  }
});

export const findReservationById = createAsyncThunk<
  ReservationResponse,
  string
>("findReservationById", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`reservations/${id}`);

    return response.data;
  } catch (error: any) {
    toast.error(getErrorMessage(error.response.data.message));
    return rejectWithValue(error);
  }
});

export const fetchIntent = createAsyncThunk<
  FetchIntentResponse,
  FetchIntentParams
>("fetchIntent", async (intentInfo, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<FetchIntentResponse> = await axios.post(
      "stripe/payment-intents",
      intentInfo
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const createProduct = createAsyncThunk<
  CreateSubscriptionResponse,
  string
>("createProduct", async (name, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<CreateSubscriptionResponse> =
      await axios.post("stripe/products", { name });

    return response.data;
  } catch (error: any) {
    toast.error(getErrorMessage(error.response.data.message));
    return rejectWithValue(error);
  }
});

export const createPlan = createAsyncThunk<
  CreateSubscriptionResponse,
  CreatePlanValues
>("createPlan", async (plan, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<CreateSubscriptionResponse> =
      await axios.post("stripe/plans", plan);

    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const createPrice = createAsyncThunk<
  CreateSubscriptionResponse,
  CreatePriceValues
>("createPrice", async (priceValues, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<CreateSubscriptionResponse> =
      await axios.post("stripe/prices", priceValues);

    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const createCustomer = createAsyncThunk<
  CreateCustomerResponse,
  CreateCustomerValues
>("createCustomer", async (customerValues, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<CreateCustomerResponse> = await axios.post(
      "stripe/customers",
      customerValues
    );

    return response.data;
  } catch (error: any) {
    toast.error(getErrorMessage(error.response.data.message));
    return rejectWithValue(error);
  }
});

export const createSession = createAsyncThunk<
  CreateSubscriptionResponse,
  CreateSubscriptionValues
>(
  "createSubscription",
  async ({ priceId, quantity = 1 }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<CreateSubscriptionResponse> =
        await axios.post("stripe/sessions", { priceId, quantity });

      return response.data;
    } catch (error: any) {
      toast.error(getErrorMessage(error.response.data.message));
      return rejectWithValue(error);
    }
  }
);
