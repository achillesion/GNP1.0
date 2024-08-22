export const GNPRoutes = {
  home: "/",
  signIn: "/sign-in",
  signUp: "/sign-up",
  account: "/account",
  basicInformation: "basic-information",
  aircraft: "aircraft",
  hangars: "hangars",
  reservations: "reservations",
  billingPaymentInfo: "billing-payment-info",
  create: "create",
  edit: "edit",
  searchHangars: "search-hangars",
  successPayment: "success-payment",
  errorPayment: "error-payment",
  notFound: "*",
  chat: "chat",
} as const;

export type RoutesType = (typeof GNPRoutes)[keyof typeof GNPRoutes];
