import sass from "./Hero.module.scss";
import { FC } from "react";
import { SearchHangars } from "./components";
import { MainTitle } from "../../../../components";

export const Hero: FC = () => {
	return (
		<section className={sass.hero}>
			<div className={sass.heroInner}>
				<div className={sass.innerInfo}>
					<MainTitle title={"Peer-to-peer short term hangar rental platform"} />
					<SearchHangars />
				</div>
				<div className={sass.innerImage}></div>
			</div>
		</section>
	);
};
