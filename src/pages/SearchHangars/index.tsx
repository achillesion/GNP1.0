import sass from "./SearchHangars.module.scss";
import { FC, useEffect } from "react";
import { useAppDispatch, useAppState } from "../../hooks";
import { clearSearchHangars, searchHangarsByDate } from "../../redux/store";
import {
	Container,
	Footer,
	NavigationBack,
	SkeletonSearchHangars,
} from "../../components";
import { SearchHangarsList } from "./components";

export const SearchHangars: FC = () => {
	const { hangars } = useAppState();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(
			searchHangarsByDate({
				from: hangars.searchFrom,
				to: hangars.searchTo,
				identifier: hangars.identifier,
			})
		);
	}, [dispatch, hangars.searchFrom, hangars.searchTo, hangars.identifier,]);

	useEffect(() => {
		return () => {
			dispatch(clearSearchHangars());
		};
	}, [dispatch]);

	return (
		<div className={sass.searchWrapper}>
			<main className={sass.search}>
				<Container>
					<div className={sass.searchInner}>
						<NavigationBack style={{ display: "flex" }} />
						{!hangars.isSearchLoading && (
							<p className={sass.textInfo}>
								{hangars.searchHangars.length} available hangars
							</p>
						)}
						{hangars.isSearchLoading ? (
							<>
								<SkeletonSearchHangars />
								<SkeletonSearchHangars />
								<SkeletonSearchHangars />
							</>
						) : hangars.searchHangars.length === 0 ? (
							<></>
						) : (
							<SearchHangarsList list={hangars.searchHangars} />
						)}
					</div>
				</Container>
			</main>
			<Footer variant={"white"} />
		</div>
	);
};
