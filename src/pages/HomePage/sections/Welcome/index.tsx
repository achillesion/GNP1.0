import sass from "./Welcome.module.scss";
import { FC } from "react";
import { AccentButton, Container, Title } from "../../../../components";
import AircraftImagePng from "../../../../images/welcome/welcome.jpg";
import AircraftImageWebp from "../../../../images/welcome/welcome.webp";

export const Welcome: FC = () => {
	return (
		<section className={sass.welcome}>
			<Container>
				<div className={sass.welcomeInner}>
					<div className={sass.title}>
						<Title title={"Welcome to Good Night Planes"} />
					</div>
					<div className={sass.content}>
						<div className={sass.welcomeImage}>
							<picture>
								<source
									width={710}
									height={542}
									srcSet={AircraftImageWebp}
									type="image/webp"
								/>
								<source
									width={710}
									height={542}
									srcSet={AircraftImagePng}
									type="image/png"
								/>
								<img
									width={710}
									height={542}
									src={AircraftImagePng}
									alt="Welcome to Good Night Planes"
									loading="lazy"
								/>
							</picture>
						</div>
						<div className={sass.description}>
							<p className={sass.text}>
								Welcome to goodnight planes, a place for pilots and
								hangar owners to collaborate and use hangar space
								to is's most effective use.
							</p>
							<p className={sass.text}>
								Goodnight Planes was founded to connect hangar space 
								with airplanes and create opporutnites at small airports
								around the country (and world!)
							</p>
							<p className={sass.text}>
								To browse hangar details, please create an account. To 
								post your hangar space as availble, create an account
								and fill in the details of your hangar.
							</p>
							<AccentButton text={"Read More"} />
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
};
