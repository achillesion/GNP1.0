import sass from "./SignUpPage.module.scss";
import { FC } from "react";
import { SignUpForm } from "./components";
import { Link } from "react-router-dom";
import { GNPRoutes } from "../../router";
import { Divider } from "../../components";

export const SignUpPage: FC = () => {
	return (
		<main className={sass.signUpPage}>
			<div className={sass.signUpInner}>
				<h1 className={sass.title}>Sign Up</h1>
				<div className={sass.form}>
					<SignUpForm />
				</div>
				<div className={sass.info}>
					<div className={sass.agreement}>
						<p>By clicking Sign up, you agree to accept Good Night Plane</p>
						<a className={sass.link} href="?">
							Terms and Conditions
						</a>
					</div>
					<Divider />
					<div className={sass.navigation}>
						<p>Don’t have an account?</p>
						<Link className={sass.navLink} to={GNPRoutes.signIn}>
							Sign In
						</Link>
					</div>
				</div>
			</div>
		</main>
	);
};
