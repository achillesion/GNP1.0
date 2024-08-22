import sass from "./NavigationBack.module.scss";
import { CSSProperties, FC } from "react";
import { Arrow } from "../../icons";
import { useNavigate } from "react-router-dom";

type NavigationBackProps = {
	style?: CSSProperties;
};

export const NavigationBack: FC<NavigationBackProps> = ({ style }) => {
	const navigation = useNavigate();

	return (
		<button
			style={style}
			onClick={() => navigation(-1)}
			className={sass.backArrow}
		>
			<Arrow />
			Back
		</button>
	);
};
