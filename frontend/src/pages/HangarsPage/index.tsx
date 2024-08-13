import sass from "./HangarsPage.module.scss";
import { FC, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAppDispatch, useAppState } from "../../hooks";
import { getPoint } from "../../utils";
import { GNPRoutes } from "../../router";
import {
	DeleteModal,
	Divider,
	PaginationInfo,
	SkeletonTable,
} from "../../components";
import { HangarsTable, HangarsTop } from "./components";
import { closeModal, fetchHangars } from "../../redux/store";
import { deleteHangar } from "../../redux/hangars/operations";

export const HangarsPage: FC = () => {
	const { hangars, entityController } = useAppState();
	const dispatch = useAppDispatch();
	const { pathname } = useLocation();
	const point = getPoint(pathname);

	useEffect(() => {
		dispatch(fetchHangars({ page: 1 }));
	}, [dispatch]);

	const onDeleteHangar = async () => {
		const resDelete = await dispatch(deleteHangar(entityController.entityId));

		if (resDelete.type === "deleteHangar/fulfilled") {
			dispatch(closeModal());
		}
	};

	return (
		<>
			<div className={sass.wrapper}>
				{point === GNPRoutes.hangars ? (
					<>
						<div className={sass.top}>
							<HangarsTop />
						</div>
						<div className={sass.divider}>
							<Divider />
						</div>
						{hangars.isLoading ? (
							<SkeletonTable />
						) : (
							<div className={sass.table}>
								{hangars.hangars.length === 0 ? (
									<p className={sass.empty}>Hangars is empty</p>
								) : (
									<>
										<div className={sass.tableWrapper}>
											<HangarsTable list={hangars.hangars} />
										</div>
										<PaginationInfo
											meta={hangars.meta!}
											onPaginate={(page) => dispatch(fetchHangars({ page }))}
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
				onDelete={onDeleteHangar}
				isDeleting={hangars.isDeletingHangar}
			/>
		</>
	);
};
