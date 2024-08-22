import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useAppState } from "../hooks";
import { RoutesType } from "../router";

type PrivateRouteProps = {
	component: JSX.Element;
	redirectTo: RoutesType;
};

export const PrivateRoute: FC<PrivateRouteProps> = ({
	component: Component,
	redirectTo = "/",
}) => {
	const { authenticate } = useAppState();
	const shouldRedirect = !authenticate.isLoggedIn && !authenticate.isRefreshing;

	return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};
