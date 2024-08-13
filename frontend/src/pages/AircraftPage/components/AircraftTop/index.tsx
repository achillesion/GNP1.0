import sass from "./AircraftTop.module.scss";
import { IconButton } from "../../../../components";
import { FC } from "react";
import { Link } from "react-router-dom";
import { GNPRoutes } from "../../../../router";
import { Plus } from "../../../../icons";

export const AircraftTop: FC = () => {
	return (
		<div className={sass.top}>
			<h2 className={sass.title}>Aircraft</h2>
			<Link
				to={`${GNPRoutes.account}/${GNPRoutes.aircraft}/${GNPRoutes.create}`}
			>
				<IconButton icon={<Plus />} text={"Create Aircraft"} />
			</Link>
		</div>
	);
};
