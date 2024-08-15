export type Meta = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  itemCount: number;
  page: string;
  pageCount: number;
  take: string;
};

interface BasicResponse<T> {
  message: string;
  result: {
    data: T;
    meta?: Meta;
  };
  statusCode: number;
}

export interface LoginResponse
  extends BasicResponse<{ user: User; tokens: Tokens }> {}

export interface UpdateUserResponse extends BasicResponse<{ user: User }> {}

export interface FetchAircraftResponse extends BasicResponse<Aircraft[]> {}

export interface AircraftResponse extends BasicResponse<Aircraft> {}

export interface DeleteResponse extends BasicResponse<{ id: string }> {}

export interface FetchHangarsResponse extends BasicResponse<Hangar[]> {}

export interface HangarsResponse extends BasicResponse<Hangar> {}

export interface ReservationResponse extends BasicResponse<Reservation> {}

export interface FetchSearchHangarsResponse extends BasicResponse<Hangar[]> {}

export interface UploadAvatarResponse extends BasicResponse<string> {}

export interface FetchPaymentInfoResponse extends BasicResponse<PaymentInfo> {}

export interface DeletePaymentInfoResponse extends BasicResponse<null> {}

export interface CreateSubscriptionResponse
  extends BasicResponse<{
    id: string;
    name?: string;
    amount?: number;
    success_url?: string;
    url?: string;
  }> {}

export interface CreateCustomerResponse
  extends BasicResponse<{ customer: string }> {}

export interface FetchIntentResponse
  extends BasicResponse<{ client_secret: string }> {}

export type UploadHangarImageResponse = {
  hangar: Hangar;
  result: {
    data: Hangar;
  };
};

export type City = {
  city_name: string;
};

export type State = {
  state_name: string;
};

export interface FetchReservationResponse
  extends BasicResponse<Reservation[]> {}

interface BasicState {
  isLoading: boolean;
  error: unknown;
  meta?: Meta | null;
}

export interface AuthenticateState extends BasicState {
  isLoggedIn: boolean;
  isUpdateLoading: boolean;
  isRefreshing: boolean;
  user: User | null;
  tokens: Tokens | null;
}

export interface AircraftState extends BasicState {
  isLoadingDelete: boolean;
  success: boolean;
  isLoadingUpdate: boolean;
  isLoadingCreating: boolean;
  aircrafts: Aircraft[];
  allAircrafts: Aircraft[];
  foundAircraft: Aircraft | null;
}

export interface CountriesState extends BasicState {
  isLoadingState: boolean;
  isLoadingCity: boolean;
  countries: Country[];
  cities: City[];
  states: State[];
  currentCountry: CountryName | null;
  currentState: string | null;
  currentCity: string | null;
  currentPhone: string;
  currentEmail: string;
  currentName: string;
}

export type Airport = {
  id: string;
  name: string | null;
  identifier: string;
};

export type Utilities = {
  [key: string]: boolean;
};

export type Hangar = {
  id: string;
  owner: string;
  title: string;
  doorHeight?: string;
  doorWidth?: string;
  airport: Airport;
  livingQuarters?: string;
  vacancyStartDate: string;
  vacancyEndDate: string;
  blockOffStartDate?: string;
  blockOffEndDate?: string;
  description?: string;
  price: string;
  accessType?: string;
  rating: number;
  width?: string;
  length?: string;
  photo: File | null | string;
  commission: string;
  customerId: string;
  heated?: string;
  cameras?: string;
};

export interface HangarsState extends BasicState {
  isUpdatingHangar: boolean;
  isDeletingHangar: boolean;
  isCreatingHangar: boolean;
  isSearchLoading: boolean;
  success: boolean;
  searchFrom: string;
  searchTo: string;
  identifier: string;
  hangars: Hangar[];
  galery: Hangar[];
  searchHangars: Hangar[];
  foundHangar: Hangar | null;
}

export type ReservationStatus = "Active" | "Completed";

export type Reservation = {
  id: string;
  aircraft: Aircraft | null;
  hangar: Hangar | null;
  price: string;
  commission: string;
  startTime: string;
  endTime: string;
  payment: string;
  status: ReservationStatus;
};

export interface ReservationsState extends BasicState {
  reservations: Reservation[];
  hangarReservations: Reservation[];
  foundReservation: Reservation | null;
  isCurrentReservations: boolean;
  isCreatingReservation: boolean;
  isDeletingReservation: boolean;
  isUpdatingReservation: boolean;
  isCreatingSubscription: boolean;
  isFetchingIntent: boolean;
  clientSecret: string;
  productId: string;
  productName: string;
  planId: string;
  priceId: string;
  customer: string;
  subscription: string;
  success_url: string;
  url: string;
  selectedReservation: CreateReservationValues | null;
}

export type CreateHangarValues = Omit<
  Hangar,
  | "owner"
  | "id"
  | "airport"
  | "rating"
  | "utilities"
  | "office"
  | "photo"
  | "commission"
  | "customerId"
> & {
  airportIdentifier: string;
  photo?: File | null | string;
  airport?: Airport;
};

export type UpdateHangarValues = CreateHangarValues & { id: string };

export type TitleProps = {
  title: string;
};

export type HomeInfoType = {
  title: string;
  text: string;
  image: string;
  id: string;
};

export type RentalsInfo = {
  icon: string;
  title: string;
  text: string;
  id: string;
};

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type User = {
  city: string;
  country: string;
  email: string;
  financialInfo?: string;
  id: string;
  name: string;
  phone: string;
  state: string;
  avatar?: string | null;
};

export type RegisterValues = {
  confirmPassword: string;
  password: string;
} & Omit<User, "id">;

export type LogInValues = Pick<RegisterValues, "email" | "password">;

export type UpdateValues = {
  password: string;
  newPassword: string;
} & Pick<RegisterValues, "name" | "email" | "phone" | "confirmPassword">;

export type NavIconProps = {
  isActive: boolean;
};

export type CreateAircraftValues = {
  name: string;
  homeAirport: string;
  model: string;
  nNumber: string;
  make: string;
  year: string;
};

export type Aircraft = {
  airport?: string | null;
  id: string;
  owner?: string | null;
} & CreateAircraftValues;

export type EntityControllerState = {
  isOpenDeleteModal: boolean;
  entityId: string;
};

export type HomeControllerState = {
  isOpen: boolean;
};

export type CreateReservationValues = ConfirmReservationHangar & {
  hangarId: string;
  price: number;
};

export type CreateReservationTitleValues = CreateReservationValues & {
  title: string;
};

export type CountryName = {
  common: string;
  official: string;
};

export type Country = {
  flags: {
    alt: string;
    png: string;
    svg: string;
  };
  idd: {
    root: string;
  };
  name: CountryName;
};

export type Option = {
  value: any;
  label: any;
};

export type SearchHangarsValues = {
  from: string;
  to: string;
  identifier: string;
};

export type ConfirmReservationHangar = {
  startTime: string;
  endTime: string;
  aircraftId: string;
  payment: string;
};

export type SaveNavigationState = {
  saveRoute: string;
};

export type EditReservationValues = {
  hangar: string;
  hangarOwner: string;
  aircraft: string;
  aircraftOwner: string;
  price: string;
  startTime: string;
  endTime: string;
  payment: string;
  commission: string;
  status: string;
};

export type UpdateReservation = Pick<
  EditReservationValues,
  "startTime" | "endTime" | "payment"
> & { id: string; hangarId: string; aircraftId: string; price: string };

export type PaymentMethods = "paypal" | "offline";

export interface PaymentState extends BasicState {
  payment: PaymentMethods;
  isCreatingLoading: boolean;
  isUpdatingLoading: boolean;
  isDeletingLoading: boolean;
  paymentInfo: PaymentInfo | null;
  successPaymentUserInfo: string;
  paymentAmount: number;
}

export type PaymentInitialsValues = Pick<PaymentState, "payment">;

export type PaymentInfo = {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  country: string;
  state: string;
  zipCode: string;
  address: string;
  email: string;
  businessName: string;
  user: User;
  id: string;
};

export type InitialPaymentInfoValues = Omit<PaymentInfo, "user" | "id">;

export type UpdatePaymentValues = Omit<PaymentInfo, "user">;

export type UploadHangarPhotoData = {
  photo: File;
  id: string;
};

export type Currency = "usd";

export type Interval = "month";

export type FetchIntentParams = {
  amount: number;
  currency: Currency;
};

export type CreateCustomerValues = {
  name: string;
  email: string;
  paymentMethod: string;
};

export type CreateSubscriptionValues = {
  priceId: string;
  quantity?: number;
};

export type CreatePlanValues = {
  amount: number;
  currency: Currency;
  productId: string;
  interval: Interval;
};

export type CreatePriceValues = {
  unitAmount: number;
  productName: string;
};

export type Message = {
  sender: string;
  receiver: string;
  message: string;
};
