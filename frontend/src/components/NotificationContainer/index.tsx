import { FC } from "react";
import { Slide, ToastContainer } from "react-toastify";

export const NotificationContainer: FC = () => {
	return (
		<ToastContainer
			position="top-right"
			autoClose={4000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			pauseOnHover
			theme="colored"
			transition={Slide}
		/>
	);
};
