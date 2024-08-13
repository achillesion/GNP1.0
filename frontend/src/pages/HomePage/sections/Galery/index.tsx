import sass from "./Galery.module.scss";
import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppState } from "../../../../hooks";
import { Container, ViewMore } from "../../../../components";
import { GaleryList } from "./components";
import { fetchGalery } from "../../../../redux/store";

export const Galery: FC = () => {
	const { hangars } = useAppState();
	const dispatch = useAppDispatch();
	const [page, setPage] = useState(1);

	useEffect(() => {
		const controller = new AbortController();

		dispatch(fetchGalery({ take: 8, page, signal: controller.signal }));

		return () => {
			controller.abort();
		};
	}, [dispatch, page]);

	return (
		<section className={sass.galery}>
			<Container>
				<div className={sass.galeryInner}>
					<div className={sass.title}>
						{/* <Title title={"Gallery"} /> */}
					</div>
					<GaleryList list={hangars.galery} />
					{hangars.meta?.hasNextPage && <div className={sass.loadMore}>
						<ViewMore
							disabled={false}
							isLoading={hangars.isLoading}
							onClick={() => setPage((prev) => (prev += 1))}
							text={"View more"}
						/>
					</div>}
				</div>
			</Container>
		</section>
	);
};
