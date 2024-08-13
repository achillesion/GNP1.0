import sass from "./DeleteModal.module.scss";
import { FC, MouseEventHandler } from "react";
import { Close, Delete } from "../../icons";
import { AccentButton } from "../AccentButton";
import { useAppDispatch } from "../../hooks";
import { closeModal, removeEntityId } from "../../redux/store";
import { Loader } from "../index";

type DeleteModalProps = {
	isOpen: boolean;
	onDelete: MouseEventHandler<HTMLButtonElement>;
	isDeleting: boolean;
};

export const DeleteModal: FC<DeleteModalProps> = ({
	isOpen,
	onDelete,
	isDeleting,
}) => {
	const dispatch = useAppDispatch();

	const onCloseModal = () => {
		dispatch(closeModal());
		dispatch(removeEntityId());
	};

	return (
		<>
			<div
				onClick={onCloseModal}
				className={isOpen ? sass.backdropActive : sass.backdrop}
			></div>
			<div className={isOpen ? sass.bodyModalActive : sass.bodyModal}>
				<button onClick={onCloseModal} className={sass.closeBtn}>
					<Close />
				</button>
				<div className={sass.modalInner}>
					<div className={sass.icon}>
						<Delete size={30} />
					</div>
					<p className={sass.title}>Are you sure?</p>
					<p className={sass.text}>
						Do you really want to delete this record? This process cannot be
						undone.
					</p>
					{isDeleting ? (
						<Loader />
					) : (
						<div className={sass.buttons}>
							<AccentButton
								onClick={onCloseModal}
								fullWidth
								text={"Cancel"}
								variant="secondary"
							/>
							<AccentButton
								onClick={onDelete}
								fullWidth
								text={"Delete"}
								variant="delete"
							/>
						</div>
					)}
				</div>
			</div>
		</>
	);
};
