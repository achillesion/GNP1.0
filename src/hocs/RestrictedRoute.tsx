import { Navigate } from "react-router-dom";
import { useAppState } from "../hooks";
import { FC } from "react";

type RestrictedRouteProps = {
	component: JSX.Element;
	redirectTo: string;
};

export const RestrictedRoute: FC<RestrictedRouteProps> = ({
	component: Component,
	redirectTo = "/",
}) => {
	const { authenticate } = useAppState();

	return authenticate.isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};
