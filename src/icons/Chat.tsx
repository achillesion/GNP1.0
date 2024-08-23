import { FC } from "react";
import { NavIconProps } from "../d";

export const Chat: FC<NavIconProps> = ({ isActive }) => {
  return isActive ? (
    <svg
      width="10"
      height="10"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 2.41077C0 1.77139 0.252586 1.1582 0.702193 0.706097C1.1518 0.253991 1.7616 0 2.39744 0H14.6026C15.2384 0 15.8482 0.253991 16.2978 0.706097C16.7474 1.1582 17 1.77139 17 2.41077V11.1772C17 11.8166 16.7474 12.4297 16.2978 12.8819C15.8482 13.334 15.2384 13.5879 14.6026 13.5879H4.97882C4.64754 13.5879 4.33456 13.7396 4.12795 14L2.09667 16.5536C1.40097 17.4268 0 16.9332 0 15.8146V2.41077Z"
        fill="black"
      />
    </svg>
  ) : (
    <svg
      width="10"
      height="10"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 16.4636V2.78873C1 2.31433 1.1873 1.85936 1.5207 1.52391C1.8541 1.18845 2.30628 1 2.77778 1H15.2222C15.6937 1 16.1459 1.18845 16.4793 1.52391C16.8127 1.85936 17 2.31433 17 2.78873V11.7324C17 12.2068 16.8127 12.6618 16.4793 12.9972C16.1459 13.3327 15.6937 13.5211 15.2222 13.5211H5.40978C5.14332 13.5211 4.88028 13.5814 4.6401 13.6976C4.39992 13.8137 4.18876 13.9826 4.02222 14.1919L1.95022 16.7981C1.88127 16.885 1.78716 16.9483 1.68092 16.979C1.57468 17.0098 1.46156 17.0066 1.35721 16.9699C1.25285 16.9332 1.16243 16.8647 1.09843 16.774C1.03444 16.6833 1.00004 16.5748 1 16.4636Z"
        stroke="#6C6C6C"
        strokeWidth="1.5"
      />
    </svg>
  );
};
