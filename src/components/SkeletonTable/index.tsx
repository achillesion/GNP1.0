import sass from "./SkeletonTable.module.scss";
import { FC } from "react";
import Skeleton from "react-loading-skeleton";

export const SkeletonTable: FC = () => {
	return (
		<div className={sass.wrapper}>
			<div className={sass.top}>
				<Skeleton className={sass.skeleton} />
			</div>
			<div className={sass.body}>
				<Skeleton className={sass.skeleton} />
				<Skeleton className={sass.skeleton} />
				<Skeleton className={sass.skeleton} />
				<Skeleton className={sass.skeleton} />
				<Skeleton className={sass.skeleton} />
			</div>
		</div>
	);
};
