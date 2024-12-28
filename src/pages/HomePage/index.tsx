import { FC, useEffect } from "react";
import { Galery, Hero, Welcome } from "./sections";
import { Footer } from "../../components";
import { useAppDispatch, useAppState } from "../../hooks";
import { clearGalery } from "../../redux/store";
import Modal from "./sections/Modal/Modal";

export const HomePage: FC = () => {
	const dispatch = useAppDispatch();
	const { homeModal } = useAppState()

	useEffect(() => {
		return () => {
			dispatch(clearGalery());
		};
	}, [dispatch]);

	return (
		<>
			<main>
				{homeModal.isOpen &&  <Modal />}
				<Hero />
				<Welcome />
				<Galery />
			</main>
			<Footer variant="gray" />
		</>
	);
};
