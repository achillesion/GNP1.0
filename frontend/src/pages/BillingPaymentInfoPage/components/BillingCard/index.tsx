import sass from "./BillingCard.module.scss";
import { FC, PropsWithChildren } from "react";
import { Divider } from "../../../../components";

type BillingCardProps = {
	title: string;
	action?: JSX.Element;
} & Required<PropsWithChildren>;

export const BillingCard: FC<BillingCardProps> = ({
	children,
	title,
	action,
}) => {
	return (
		<div className={sass.card}>
			<div className={sass.cardTop}>
				<p className={sass.title}>{title}</p>
				{action !== undefined && action}
			</div>
			<div className={sass.divider}>
				<Divider />
			</div>
			{children}
		</div>
	);
};
