import sass from "./SearchLocationHangar.module.scss";
import { APIProvider, useMapsLibrary } from "@vis.gl/react-google-maps";
import { FC, memo, useEffect, useMemo, useState } from "react";
import { MapView } from "../index";
import { FormikValues } from "formik";
import { NYCoordinates } from "../../constants";
import { SearchPanel } from "./components";

const { REACT_APP_GOOGLE_CLOUD_API_KEY } = process.env;

type SearchLocationHangarProps = {
	name: string;
	placeholder?: string;
	formik: FormikValues;
	lat?: number;
	lng?: number;
};

export const SearchLocationHangar: FC<SearchLocationHangarProps> = ({
	formik,
	name,
	placeholder,
	lat,
	lng,
}) => {
	return (
		<APIProvider apiKey={`${REACT_APP_GOOGLE_CLOUD_API_KEY}`}>
			<Geocoding
				lat={lat}
				lng={lng}
				name={name}
				formik={formik}
				placeholder={placeholder}
			/>
		</APIProvider>
	);
};

const Geocoding: FC<SearchLocationHangarProps> = ({
	formik,
	name,
	placeholder,
	lat,
	lng,
}) => {
	const geocodingApiLoaded = useMapsLibrary("geocoding");
	const [geocodingService, setGeocodingService] =
		useState<google.maps.Geocoder>();
	const [geocodingResult, setGeocodingResult] =
		useState<google.maps.GeocoderResult>();

	const [geocodingResults, setGeocodingResults] = useState<
		google.maps.GeocoderResult[] | null
	>(null);

	useEffect(() => {
		if (!geocodingApiLoaded) {
			setGeocodingResults(null);
			return;
		}

		setGeocodingService(new window.google.maps.Geocoder());
	}, [geocodingApiLoaded]);

	useEffect(() => {
		if (!geocodingService || !formik.values[name]) {
			setGeocodingResults(null);
			return;
		}

		geocodingService.geocode(
			{ address: formik.values[name] },
			(results, status) => {
				if (
					results &&
					status === "OK" &&
					(!geocodingResults || geocodingResults.length === 0)
				) {
					setGeocodingResults(results);
				}
			}
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values[name], geocodingService]);

	const handleClickAddress = (geocoderResult: google.maps.GeocoderResult) => {
		setGeocodingResult(geocoderResult);

		formik.setValues({
			...formik.values,
			latitude: geocoderResult.geometry.location.lat(),
			longitude: geocoderResult.geometry.location.lng(),
			[name]: geocoderResult.formatted_address,
			isFind: "find",
		});

		setTimeout(() => {
			setGeocodingResults(null);
		}, 0);
	};

	const isError = formik.errors[name] && formik.touched[name];

	const MemoizedMapView = useMemo(
		() =>
			memo(() => {
				const latitude = geocodingResult?.geometry?.location?.lat() || lat;
				const longitude = geocodingResult?.geometry?.location?.lng() || lng;

				return (
					<MapView
						clickable
						geocodingService={geocodingService}
						setGeocodingResults={setGeocodingResults}
						geocodingResults={geocodingResults}
						lat={latitude === undefined ? NYCoordinates.lat : latitude}
						lng={longitude === undefined ? NYCoordinates.lng : longitude}
					/>
				);
			}),
		[
			geocodingResult?.geometry?.location,
			lat,
			lng,
			geocodingService,
			geocodingResults,
		]
	);

	return (
		<div>
			<div className={sass.seacrh}>
				<input
					type="text"
					name={name}
					id={name}
					value={formik.values[name]}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					placeholder={placeholder}
					className={sass.input}
				/>
				{isError && <div className={sass.errorText}>{formik.errors[name]}</div>}
				{geocodingResults !== null && geocodingResults.length > 0 && (
					<SearchPanel
						list={geocodingResults}
						onClick={handleClickAddress}
						setGeocodingResults={setGeocodingResults}
					/>
				)}
			</div>
			<MemoizedMapView />
		</div>
	);
};
