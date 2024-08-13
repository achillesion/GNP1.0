import sass from "./Loader.module.scss";
import { FC } from "react";

type LoaderProps = {
	size?: number;
	color?: string;
};

export const Loader: FC<LoaderProps> = ({ size, color }) => (
	<div
		style={{ width: size === undefined ? 40 : size }}
		className={sass.showbox}
	>
		<div className={sass.loader}>
			<svg
				width={50}
				height={50}
				className={sass.circular}
				viewBox="25 25 50 50"
				stroke={color === undefined ? "#00dbff" : color}
			>
				<circle
					className={sass.path}
					cx="50"
					cy="50"
					r="20"
					fill="none"
					strokeWidth="3"
					strokeMiterlimit="10"
				/>
			</svg>
		</div>
	</div>
);
