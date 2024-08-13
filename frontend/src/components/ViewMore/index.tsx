import sass from "./ViewMore.module.scss";
import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";
import { Loader } from "../Loader";

type ViewMoreProps = {
	isLoading: boolean;
	text: string;
} & DetailedHTMLProps<
	ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>;

export const ViewMore: FC<ViewMoreProps> = ({
	text,
	onClick,
	isLoading,
	disabled,
}) => {
	return (
		<>
			{isLoading ? (
				<Loader color="#1d1d1d" />
			) : (
				<button disabled={disabled} className={sass.button} onClick={onClick}>
					{text}
				</button>
			)}
		</>
	);
};
