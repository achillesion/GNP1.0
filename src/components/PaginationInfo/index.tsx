import sass from "./PaginationInfo.module.scss";
import { FC } from "react";
import { Pagination } from "antd";
import { Meta } from "../../d";

type PaginationInfoProps = {
	meta: Meta;
	onPaginate: (page: number) => void;
};

export const PaginationInfo: FC<PaginationInfoProps> = ({
	meta,
	onPaginate,
}) => {
	const startIndex = (parseInt(meta.page) - 1) * parseInt(meta.take) + 1;
	const endIndex = Math.min(
		parseInt(meta.page) * parseInt(meta.take),
		meta.itemCount
	);

	return (
		<div className={sass.wrapper}>
			<p className={sass.textInfo}>
				Showing {startIndex} to {endIndex} of {meta.itemCount} entries
			</p>
			<Pagination
				responsive
				onChange={onPaginate}
				pageSize={5}
				defaultCurrent={1}
				total={meta.itemCount}
				current={Number(meta.page)}
				showSizeChanger={false}
			/>
		</div>
	);
};
