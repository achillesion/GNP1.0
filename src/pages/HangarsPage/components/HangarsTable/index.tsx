import sass from "./HangarsTable.module.scss";
import { FC } from "react";
import { Hangar } from "../../../../d";
import { Link } from "react-router-dom";
import { GNPRoutes } from "../../../../router";
import { Delete, Edit } from "../../../../icons";
import { FormatterDate } from "../../../../utils";
import { useAppDispatch } from "../../../../hooks";
import { openModal, setEntityId } from "../../../../redux/store";

type HangarsTableProps = {
	list: Hangar[];
};

export const HangarsTable: FC<HangarsTableProps> = ({ list }) => {
	const dispatch = useAppDispatch();

	return (
		<table>
			<thead className={sass.tableHeader}>
				<tr className={sass.headerRow}>
					<th className={sass.headerItem}>#</th>
					<th className={sass.headerItem}>Edit</th>
					<th className={sass.headerItem}>Title</th>
					<th className={sass.headerItem}>Door Heigth</th>
					<th className={sass.headerItem}>Door Width</th>
					<th className={sass.headerItem}>Airport Identifier</th>
					<th className={sass.headerItem}>Access type</th>
					<th className={sass.headerItem}>Living quarters</th>
					<th className={sass.headerItem}>Vacancy Date & time</th>
					<th className={sass.headerItem}>Block Off Date & time</th>
					<th className={sass.headerItem}>Remove</th>

				</tr>
			</thead>
			<tbody>
				{list.map((hangar, index) => (
					<tr key={hangar.id} className={sass.bodyRow}>
						<td className={sass.bodyItem}>{index + 1}</td>
						<td className={sass.bodyItem}>
							<div className={sass.actions}>
								<Link
									className={sass.edit}
									to={`${GNPRoutes.account}/${GNPRoutes.hangars}/${GNPRoutes.edit}/${hangar.id}`}
								>
									<Edit />
									<span className={sass.underline} />
								</Link>
								
							</div>
						</td>
						<td className={sass.bodyItem}>{hangar.title}</td>
						<td className={sass.bodyItem}>{hangar.doorWidth}</td>
						<td className={sass.bodyItem}>{hangar.doorHeight}</td>
						<td className={sass.bodyItem}>{hangar.airport.identifier}</td>
						<td className={sass.bodyItem}>{hangar.accessType}</td>
						<td className={sass.bodyItem}>{hangar.livingQuarters}</td>
						<td className={sass.bodyItem}>
							{FormatterDate.formatDate({
								dateString: hangar.vacancyStartDate,
								full: false,
							})}{" "}
							-{" "}
							{FormatterDate.formatDate({
								dateString: hangar.vacancyEndDate,
								full: false,
							})}
						</td>
						<td className={sass.bodyItem}>

							{hangar.blockOffStartDate && `${FormatterDate.formatDate({
								dateString: hangar.blockOffStartDate,
								full: false,
							})} - `}
							{hangar.blockOffEndDate && FormatterDate.formatDate({
								dateString: hangar.blockOffEndDate,
								full: false,
							})}
						</td>
						<td className={sass.bodyItem}>
							<div className={sass.actions}>
								<button
									onClick={() => {
										dispatch(openModal());
										dispatch(setEntityId(hangar.id));
									}}
								>
									<Delete />
								</button>
							</div>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
