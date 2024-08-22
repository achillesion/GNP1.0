import sass from "./AircraftsTable.module.scss";
import { FC } from "react";
import { Aircraft } from "../../../../d";
import { Delete, Edit } from "../../../../icons";
import { Link } from "react-router-dom";
import { GNPRoutes } from "../../../../router";
import { useAppDispatch } from "../../../../hooks";
import { openModal, setEntityId } from "../../../../redux/store";

type AircraftsTableProps = {
	list: Aircraft[];
};

export const AircraftsTable: FC<AircraftsTableProps> = ({ list }) => {
	const dispatch = useAppDispatch();

	return (
		<table className={sass.table}>
			<thead className={sass.tableHeader}>
				<tr className={sass.headerRow}>
					<th className={sass.headerItem}>#</th>
					<th className={sass.headerItem}>Edit</th>
					<th className={sass.headerItem}>Name</th>
					<th className={sass.headerItem}>N Number</th>
					<th className={sass.headerItem}>Home Airport</th>
					<th className={sass.headerItem}>Make</th>
					<th className={sass.headerItem}>Model</th>
					<th className={sass.headerItem}>Year</th>
					<th className={sass.headerItem}>Remove</th>

				</tr>
			</thead>
			<tbody>
				{list.map((aircraft, index) => (
					<tr key={aircraft.id} className={sass.bodyRow}>
						<td className={sass.bodyItem}>{index + 1}</td>
						<td className={sass.bodyItem}>
							<div className={sass.actions}>
								<Link
									className={sass.edit}
									to={`${GNPRoutes.account}/${GNPRoutes.aircraft}/${GNPRoutes.edit}/${aircraft.id}`}
								>
									<Edit />
									<span className={sass.underline} />
								</Link>
							</div>
						</td>
						<td className={sass.bodyItem}>{aircraft.name}</td>
						<td className={sass.bodyItem}>{aircraft.nNumber}</td>
						<td className={sass.bodyItem}>{aircraft.homeAirport}</td>
						<td className={sass.bodyItem}>{aircraft.make}</td>
						<td className={sass.bodyItem}>{aircraft.model}</td>
						<td className={sass.bodyItem}>{aircraft.year}</td>
						<td className={sass.bodyItem}>
							<div className={sass.actions}>
								<button
									onClick={() => {
										dispatch(openModal());
										dispatch(setEntityId(aircraft.id));
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
