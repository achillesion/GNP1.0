import { FC } from "react";
import { NavIconProps } from "../d";

export const Profile: FC<NavIconProps> = ({ isActive }) => {
	return isActive ? (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g clipPath="url(#clip0_2001_6045)">
				<path
					d="M12 12C14.4853 12 16.5 9.98528 16.5 7.5C16.5 5.01472 14.4853 3 12 3C9.51472 3 7.5 5.01472 7.5 7.5C7.5 9.98528 9.51472 12 12 12Z"
					fill="#1D1D1D"
				/>
				<path
					d="M12 13.5C8.27379 13.5041 5.25415 16.5238 5.25 20.25C5.25 20.6642 5.58578 21 5.99999 21H18C18.4142 21 18.75 20.6642 18.75 20.25C18.7459 16.5238 15.7262 13.5041 12 13.5Z"
					fill="#1D1D1D"
				/>
			</g>
			<defs>
				<clipPath id="clip0_2001_6045">
					<rect
						width="18"
						height="18"
						fill="white"
						transform="translate(3 3)"
					/>
				</clipPath>
			</defs>
		</svg>
	) : (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M15.75 7.5C15.75 9.70914 13.9591 11.5 11.75 11.5C9.54086 11.5 7.75 9.70914 7.75 7.5C7.75 5.29086 9.54086 3.5 11.75 3.5C13.9591 3.5 15.75 5.29086 15.75 7.5Z"
				stroke="#6C6C6C"
			/>
			<mask id="path-2-inside-1_2001_3596" fill="white">
				<path d="M11.75 13.5C8.02379 13.5041 5.00415 16.5238 5 20.25C5 20.6642 5.33578 21 5.74999 21H17.75C18.1642 21 18.5 20.6642 18.5 20.25C18.4959 16.5238 15.4762 13.5041 11.75 13.5Z" />
			</mask>
			<path
				d="M11.75 13.5L11.7511 12.5L11.7489 12.5L11.75 13.5ZM5 20.25L4 20.2489V20.25H5ZM18.5 20.25L19.5 20.25L19.5 20.2489L18.5 20.25ZM11.7489 12.5C7.47126 12.5048 4.00476 15.9713 4 20.2489L6 20.2511C6.00353 17.0763 8.57632 14.5035 11.7511 14.5L11.7489 12.5ZM4 20.25C4 21.2165 4.78349 22 5.74999 22V20C5.88806 20 6 20.1119 6 20.25H4ZM5.74999 22H17.75V20H5.74999V22ZM17.75 22C18.7165 22 19.5 21.2165 19.5 20.25H17.5C17.5 20.1119 17.6119 20 17.75 20V22ZM19.5 20.2489C19.4952 15.9713 16.0287 12.5047 11.7511 12.5L11.7489 14.5C14.9237 14.5035 17.4965 17.0763 17.5 20.2511L19.5 20.2489Z"
				fill="#6C6C6C"
				mask="url(#path-2-inside-1_2001_3596)"
			/>
		</svg>
	);
};
