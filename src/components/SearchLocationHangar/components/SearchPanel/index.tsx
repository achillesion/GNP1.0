import sass from "./SearchPanel.module.scss";
import { Dispatch, FC, useEffect } from "react";

type SearchPanelProps = {
	list: google.maps.GeocoderResult[];
	onClick: (geocoderResult: google.maps.GeocoderResult) => void;
	setGeocodingResults: Dispatch<
		React.SetStateAction<google.maps.GeocoderResult[] | null>
	>;
};

export const SearchPanel: FC<SearchPanelProps> = ({
	list,
	onClick,
	setGeocodingResults,
}) => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (target.id === "location") return;

			setGeocodingResults(null);
		};

		document.body.addEventListener("click", handleClickOutside);

		return () => {
			document.body.removeEventListener("click", handleClickOutside);
		};
	}, [setGeocodingResults]);

	return (
		<div className={sass.searchPanel}>
			<>
				{list.map((geocoderResult) => {
					return (
						<button
							type="button"
							className={sass.button}
							key={geocoderResult.place_id}
							onClick={() => onClick(geocoderResult)}
						>
							{geocoderResult.formatted_address}
						</button>
					);
				})}
			</>
		</div>
	);
};
