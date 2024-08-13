import sass from "./LogInPage.module.scss";
import { FC } from "react";
import { LogInForm } from "./components";
import { Link } from "react-router-dom";
import { GNPRoutes } from "../../router";

export const LogInPage: FC = () => {
	return (
		<main className={sass.logInPage}>
			<div className={sass.LogInInner}>
				<h1 className={sass.title}>Welcome back!</h1>
				<p className={sass.subtitle}>Login to your account</p>
				<div className={sass.form}>
					<LogInForm />
				</div>
				<div className={sass.navigation}>
					<p>Don’t have an account?</p>
					<Link className={sass.navLink} to={GNPRoutes.signUp}>
						Sign Up
					</Link>
				</div>
			</div>
		</main>
	);
};
