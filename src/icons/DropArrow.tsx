import { FC } from "react";

type DropArrowProps = {
	color?: string;
};

export const DropArrow: FC<DropArrowProps> = ({ color }) => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M12.4993 15.6387C12.2273 15.9108 11.7727 15.9108 11.5 15.6387L5.20666 9.36151C4.93111 9.08597 4.93111 8.63911 5.20666 8.36427C5.4822 8.08873 5.92975 8.08873 6.20529 8.36427L12 14.1428L17.794 8.36357C18.0702 8.08803 18.517 8.08803 18.7933 8.36357C19.0688 8.63911 19.0688 9.08597 18.7933 9.36081L12.4993 15.6387Z"
			fill={color === undefined ? "white" : color}
		/>
	</svg>
);
