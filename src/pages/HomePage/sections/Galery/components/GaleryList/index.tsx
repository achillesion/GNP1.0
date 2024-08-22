import sass from "./GaleryList.module.scss";
import { FC } from "react";
import { Hangar } from "../../../../../../d";
import { GaleryCard } from "../GaleryCard";

type GaleryListProps = {
	list: Hangar[];
};

export const GaleryList: FC<GaleryListProps> = ({ list }) => {
	return (
		<ul className={sass.list}>
			{list.map((card) => (
				<GaleryCard key={card.id} card={card} />
			))}
		</ul>
	);
};
