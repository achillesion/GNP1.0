import sass from "./ReservationsPage.module.scss";
import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppState } from "../../hooks";
import {
  closeModal,
  fetchReservations,
  deleteReservation,
} from "../../redux/store";
import {
  HangarReservationsTop,
  ReservationsTable,
  ReservationsTop,
} from "./components";
import {
  DeleteModal,
  Divider,
  PaginationInfo,
  SkeletonTable,
} from "../../components";
import { Outlet, useLocation } from "react-router-dom";
import { GNPRoutes } from "../../router";
import { getPoint } from "../../utils";
import axios from "axios";
import { Meta } from "../../d";

export const ReservationsPage: FC = () => {
  const { reservations, entityController } = useAppState();
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const point = getPoint(pathname);

  const [hangarReservations, setHangarReservations] = useState([]);
  const [hangarReservationsMeta, setHangarReservationsMeta] = useState<Meta>({
    hasNextPage: false,
    hasPreviousPage: false,
    itemCount: 0,
    page: "1",
    pageCount: 1,
    take: "5",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchReservations(1));
    fetchHangarReservations(1);
  }, [dispatch]);

  const fetchHangarReservations = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/reservations/myHangars?page=${page}&take=5`
      );
      console.log(response.data.result.data);
      setHangarReservations(response.data.result.data);
      setHangarReservationsMeta(response.data.result.meta);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
    }
  };

  const onDeleteReservation = async () => {
    const resDelete = await dispatch(
      deleteReservation(entityController.entityId)
    );

    if (resDelete.type === "deleteReservation/fulfilled") {
      dispatch(closeModal());
    }
  };

  const reservationsList = reservations.isCurrentReservations
    ? reservations.reservations.filter(
        (reservations) => reservations?.status === "Active"
      )
    : reservations.reservations.filter(
        (reservations) => reservations?.status === "Completed"
      );

  return (
    <>
      <div className={sass.wrapper}>
        {point === GNPRoutes.reservations ? (
          <>
            <div className={sass.top}>
              <ReservationsTop />
            </div>
            <div className={sass.divider}>
              <Divider />
            </div>
            {reservations.isLoading ? (
              <SkeletonTable />
            ) : (
              <div className={sass.table}>
                {reservationsList.length === 0 ? (
                  <p className={sass.empty}>Select reservations is empty</p>
                ) : (
                  <>
                    <div className={sass.tableWrapper}>
                      <ReservationsTable list={reservationsList} />
                    </div>
                    <PaginationInfo
                      meta={reservations.meta!}
                      onPaginate={(page) => dispatch(fetchReservations(page))}
                    />
                  </>
                )}
              </div>
            )}

            <div className={sass.divider}>
              <Divider />
            </div>

            <div className={sass.top}>
              <HangarReservationsTop />
            </div>
            <div className={sass.divider}>
              <Divider />
            </div>
            <div className={sass.table}>
              {loading ? (
                <SkeletonTable />
              ) : (
                <>
                  {hangarReservations.length === 0 ? (
                    <p className={sass.empty}>Your hangar is empty</p>
                  ) : (
                    <div className={sass.tableWrapper}>
                      <ReservationsTable list={hangarReservations} />
                    </div>
                  )}
                  <PaginationInfo
                    meta={hangarReservationsMeta}
                    onPaginate={(page) => fetchHangarReservations(page)}
                  />
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <Outlet />
          </>
        )}
      </div>

      <DeleteModal
        isOpen={entityController.isOpenDeleteModal}
        onDelete={onDeleteReservation}
        isDeleting={reservations.isDeletingReservation}
      />
    </>
  );
};
