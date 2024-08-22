import sass from "./HangarsTop.module.scss";
import { Link } from "react-router-dom";
import { FC } from "react";
import { GNPRoutes } from "../../../../router";
import { IconButton } from "../../../../components";
import { Plus } from "../../../../icons";

export const HangarsTop: FC = () => {
	return (
		<div className={sass.top}>
			<h2 className={sass.title}>Hangars</h2>
			<Link
				to={`${GNPRoutes.account}/${GNPRoutes.hangars}/${GNPRoutes.create}`}
			>
				<IconButton icon={<Plus />} text={"Create Hangar"} />
			</Link>
		</div>
	);
};
