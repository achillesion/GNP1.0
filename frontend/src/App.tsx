import { Route, Routes } from "react-router-dom";
import { useAppState, useRefresh } from "./hooks";
import { GNPRoutes } from "./router";
import { RestrictedRoute, PrivateRoute, ErrorBoundary } from "./hocs";
import {
  AccountPage,
  AircraftPage,
  BasicInformation,
  BillingPaymentInfoPage,
  CreateAircraftPage,
  CreateHangarsPage,
  EditAircraftPage,
  EditHangarsPage,
  EditReservationPage,
  HangarsPage,
  HomePage,
  LogInPage,
  NotFoundPage,
  ReservationsPage,
  SignUpPage,
  SearchHangars,
  EditBillingPaymentInfoPage,
  CreateBillingPaymentInfoPage,
  SuccessPaymentPage,
  ErrorPaymentPage,
  ChatPage,
} from "./pages";
import { Header, LoadingScreen, NotificationContainer } from "./components";

import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  useRefresh();
  const { authenticate } = useAppState();

  return (
    <ErrorBoundary>
      {authenticate.isRefreshing ? (
        <LoadingScreen />
      ) : (
        <>
          <Header />
          <Routes>
            <Route path={GNPRoutes.home} element={<HomePage />} />
            <Route path={GNPRoutes.searchHangars} element={<SearchHangars />} />
            <Route
              path={GNPRoutes.signUp}
              element={
                <RestrictedRoute
                  redirectTo={`${GNPRoutes.account}/${GNPRoutes.basicInformation}`}
                  component={<SignUpPage />}
                />
              }
            />
            <Route
              path={GNPRoutes.signIn}
              element={
                <RestrictedRoute
                  redirectTo={`${GNPRoutes.account}/${GNPRoutes.basicInformation}`}
                  component={<LogInPage />}
                />
              }
            />
            <Route
              path={GNPRoutes.successPayment}
              element={
                <PrivateRoute
                  redirectTo={GNPRoutes.signIn}
                  component={<SuccessPaymentPage />}
                />
              }
            />
            <Route
              path={GNPRoutes.errorPayment}
              element={
                <PrivateRoute
                  redirectTo={GNPRoutes.signIn}
                  component={<ErrorPaymentPage />}
                />
              }
            />
            <Route
              path={GNPRoutes.account}
              element={
                <PrivateRoute
                  redirectTo={GNPRoutes.signIn}
                  component={<AccountPage />}
                />
              }
            >
              <Route
                path={GNPRoutes.basicInformation}
                element={
                  <PrivateRoute
                    redirectTo={GNPRoutes.signIn}
                    component={<BasicInformation />}
                  />
                }
              />
              <Route
                path={GNPRoutes.aircraft}
                element={
                  <PrivateRoute
                    redirectTo={GNPRoutes.signIn}
                    component={<AircraftPage />}
                  />
                }
              >
                <Route
                  path={GNPRoutes.create}
                  element={
                    <PrivateRoute
                      redirectTo={GNPRoutes.signIn}
                      component={<CreateAircraftPage />}
                    />
                  }
                />
                <Route
                  path={`${GNPRoutes.edit}/:aircraftId`}
                  element={
                    <PrivateRoute
                      redirectTo={GNPRoutes.signIn}
                      component={<EditAircraftPage />}
                    />
                  }
                />
              </Route>
              <Route
                path={GNPRoutes.hangars}
                element={
                  <PrivateRoute
                    redirectTo={GNPRoutes.signIn}
                    component={<HangarsPage />}
                  />
                }
              >
                <Route
                  path={GNPRoutes.create}
                  element={
                    <PrivateRoute
                      redirectTo={GNPRoutes.signIn}
                      component={<CreateHangarsPage />}
                    />
                  }
                />
                <Route
                  path={`${GNPRoutes.edit}/:hangarId`}
                  element={
                    <PrivateRoute
                      redirectTo={GNPRoutes.signIn}
                      component={<EditHangarsPage />}
                    />
                  }
                />
              </Route>
              <Route
                path={GNPRoutes.reservations}
                element={
                  <PrivateRoute
                    redirectTo={GNPRoutes.signIn}
                    component={<ReservationsPage />}
                  />
                }
              >
                <Route
                  path={`${GNPRoutes.edit}/:reservationId`}
                  element={
                    <PrivateRoute
                      redirectTo={GNPRoutes.signIn}
                      component={<EditReservationPage />}
                    />
                  }
                />
              </Route>
              <Route
                path={GNPRoutes.billingPaymentInfo}
                element={
                  <PrivateRoute
                    redirectTo={GNPRoutes.signIn}
                    component={<BillingPaymentInfoPage />}
                  />
                }
              >
                <Route
                  path={GNPRoutes.edit}
                  element={
                    <PrivateRoute
                      redirectTo={GNPRoutes.signIn}
                      component={<EditBillingPaymentInfoPage />}
                    />
                  }
                />
                <Route
                  path={GNPRoutes.create}
                  element={
                    <PrivateRoute
                      redirectTo={GNPRoutes.signIn}
                      component={<CreateBillingPaymentInfoPage />}
                    />
                  }
                />
              </Route>
              <Route
                path={GNPRoutes.chat}
                element={
                  <PrivateRoute
                    redirectTo={GNPRoutes.signIn}
                    component={<ChatPage />}
                  />
                }
              >
                <Route
                  path={`:receiverId`}
                  element={
                    <PrivateRoute
                      redirectTo={GNPRoutes.signIn}
                      component={<ChatPage />}
                    />
                  }
                />
              </Route>
            </Route>
            <Route path={GNPRoutes.notFound} element={<NotFoundPage />} />
          </Routes>
        </>
      )}
      <NotificationContainer />
    </ErrorBoundary>
  );
}

export default App;
