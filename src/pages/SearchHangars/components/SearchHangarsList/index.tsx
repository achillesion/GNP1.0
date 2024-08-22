import sass from "./SearchHangarsList.module.scss";
import { FC, useEffect, useState } from "react";
import { Hangar } from "../../../../d";
import { SearchHangar } from "../SearchHangar";
import { ConfirmReseravationHangarModal } from "../../../../components";
import { useAppDispatch } from "../../../../hooks";
import { fetchIntent } from "../../../../redux/store";
import { calculateAmount } from "../../../../utils";

type SearchHangarsListProps = {
	list: Hangar[];
};

export const SearchHangarsList: FC<SearchHangarsListProps> = ({ list }) => {
	const [isOpenModal, setOpenModal] = useState<boolean>(false);
	const [currentHangar, setCurrentHangar] = useState<Hangar | null>(null);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (currentHangar) {
			const amount =
				Number(currentHangar.price) +
				calculateAmount({
					amount: Number(currentHangar.price),
					commission: 20,
				});

			dispatch(
				fetchIntent({
					amount,
					currency: "usd",
				})
			);
		}
	}, [dispatch, currentHangar]);

	const onClose = () => {
		setOpenModal(false);
		setCurrentHangar(null);
	};

	return (
		<>
			<ul className={sass.list}>
				{list.map((hangar) => (
					<SearchHangar
						key={hangar.id}
						hangar={hangar}
						setCurrentHangar={setCurrentHangar}
						setOpenModal={setOpenModal}
						isOpenModal={isOpenModal}
					/>
				))}
			</ul>
			<ConfirmReseravationHangarModal
				hangar={currentHangar}
				isOpen={isOpenModal}
				onClose={onClose}
			/>
		</>
	);
};
