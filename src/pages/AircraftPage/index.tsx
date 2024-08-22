import sass from "./AircraftPage.module.scss";
import { FC, useEffect } from "react";
import { AircraftTop, AircraftsTable } from "./components";
import {
	DeleteModal,
	Divider,
	PaginationInfo,
	SkeletonTable,
} from "../../components";
import { useAppDispatch, useAppState } from "../../hooks";
import { closeModal, deleteAircraft, fetchAircrafts } from "../../redux/store";
import { Outlet, useLocation } from "react-router-dom";
import { getPoint } from "../../utils";
import { GNPRoutes } from "../../router";

export const AircraftPage: FC = () => {
	const { aircraft, entityController } = useAppState();
	const dispatch = useAppDispatch();

	const { pathname } = useLocation();
	const point = getPoint(pathname);

	useEffect(() => {
		dispatch(fetchAircrafts(1));
	}, [dispatch]);

	const onDeleteAircraft = async () => {
		const resDelete = await dispatch(deleteAircraft(entityController.entityId));

		if (resDelete.type === "deleteAircraft/fulfilled") {
			dispatch(closeModal());
		}
	};

	return (
		<>
			<div className={sass.wrapper}>
				{point === GNPRoutes.aircraft ? (
					<>
						<div className={sass.top}>
							<AircraftTop />
						</div>
						<div className={sass.divider}>
							<Divider />
						</div>
						{aircraft.isLoading ? (
							<SkeletonTable />
						) : (
							<div className={sass.table}>
								{aircraft.aircrafts.length === 0 ? (
									<p className={sass.empty}>Aircrafts is empty</p>
								) : (
									<>
										<div className={sass.tableWrapper}>
											<AircraftsTable list={aircraft.aircrafts} />
										</div>
										<PaginationInfo
											meta={aircraft.meta!}
											onPaginate={(page) => dispatch(fetchAircrafts(page))}
										/>
									</>
								)}
							</div>
						)}
					</>
				) : (
					<>
						<Outlet />
					</>
				)}
			</div>
			<DeleteModal
				isOpen={entityController.isOpenDeleteModal}
				onDelete={onDeleteAircraft}
				isDeleting={aircraft.isLoadingDelete}
			/>
		</>
	);
};
