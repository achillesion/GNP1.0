import sass from "./ReservationsTable.module.scss";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../../hooks";
import { GNPRoutes } from "../../../../router";
import { Delete, Edit } from "../../../../icons";
import { Reservation } from "../../../../d";
import { openModal, setEntityId } from "../../../../redux/store";
import { FormatterDate } from "../../../../utils";

type ReservationsTableProps = {
	list: Reservation[];
};

export const ReservationsTable: FC<ReservationsTableProps> = ({ list }) => {
	const dispatch = useAppDispatch();

	return (
		<table>
			<thead className={sass.tableHeader}>
				<tr className={sass.headerRow}>
					<th className={sass.headerItem}>#</th>
					<th className={sass.headerItem}>Hangar</th>
					<th className={sass.headerItem}>Hangar Owner</th>
					<th className={sass.headerItem}>Aircraft Owner</th>
					<th className={sass.headerItem}>Aircraft</th>
					<th className={sass.headerItem}>Price</th>
					<th className={sass.headerItem}>Commission</th>
					<th className={sass.headerItem}>Start Time</th>
					<th className={sass.headerItem}>End Time</th>
					<th className={sass.headerItem}>Payment</th>
					<th className={sass.headerItem}>Status</th>
					{list[0]?.status === "Active" && (
						<th className={sass.headerItem}>Action</th>
					)}
				</tr>
			</thead>
			<tbody>
				{list.map((reservation, index) => (
					<tr key={reservation.id} className={sass.bodyRow}>
						<td className={sass.bodyItem}>{index + 1}</td>
						<td className={sass.bodyItem}>
							{reservation.hangar && reservation.hangar.title}
						</td>
						<td className={sass.bodyItem}>
							{reservation.hangar && reservation.hangar.owner}
						</td>
						<td className={sass.bodyItem}>
							{reservation.aircraft && reservation.aircraft.owner}
						</td>
						<td className={sass.bodyItem}>
							{reservation.aircraft && reservation.aircraft.name}
						</td>
						<td className={sass.bodyItem}>${reservation.price}</td>
						<td className={sass.bodyItem}>{reservation.commission}%</td>
						<td className={sass.bodyItem}>
							{FormatterDate.formatDate({
								dateString: reservation.startTime,
								full: false,
							})}
						</td>
						<td className={sass.bodyItem}>
							{FormatterDate.formatDate({
								dateString: reservation.endTime,
								full: false,
							})}
						</td>
						<td className={sass.bodyItem}>{reservation.payment}</td>
						<td className={sass.bodyItem}>
							<span
								className={
									reservation.status === "Active" ? sass.active : sass.completed
								}
							>
								{reservation.status}
							</span>
						</td>
						{reservation.status === "Active" && (
							<td className={sass.bodyItem}>
								<div className={sass.actions}>
									<Link
										className={sass.edit}
										to={`${GNPRoutes.account}/${GNPRoutes.reservations}/${GNPRoutes.edit}/${reservation.id}`}
									>
										<Edit />
										<span className={sass.underline} />
									</Link>
									<button
										onClick={() => {
											dispatch(openModal());
											dispatch(setEntityId(reservation.id));
										}}
									>
										<Delete />
									</button>
								</div>
							</td>
						)}
					</tr>
				))}
			</tbody>
		</table>
	);
};
