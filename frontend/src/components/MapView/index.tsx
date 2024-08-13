import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { Map, Marker } from "./components";
import { Dispatch, SetStateAction, useState } from "react";

const { REACT_APP_GOOGLE_CLOUD_API_KEY } = process.env;

const render = (status: Status) => {
	return <h1>{status}</h1>;
};

type MapViewProps = {
	lat: number;
	lng: number;
	clickable?: boolean;
	geocodingService?: google.maps.Geocoder;
	setGeocodingResults?: Dispatch<
		SetStateAction<google.maps.GeocoderResult[] | null>
	>;
	geocodingResults?: google.maps.GeocoderResult[] | null;
};

export const MapView: React.FC<MapViewProps> = ({
	lat,
	lng,
	clickable,
	geocodingService,
	setGeocodingResults,
	geocodingResults,
}) => {
	const [center, setCenter] = useState<google.maps.LatLngLiteral>({
		lat,
		lng,
	});

	const handleClickMap = (e: google.maps.MapMouseEvent) => {
		const latlng = { lat: e.latLng?.lat()!, lng: e.latLng?.lng()! };

		setCenter((prev) => ({
			...prev,
			...latlng,
		}));

		geocodingService!.geocode({ location: latlng }, (results, status) => {
			if (
				results &&
				status === "OK" &&
				(!geocodingResults || geocodingResults.length === 0)
			) {
				setGeocodingResults!(results);
			}
		});
	};

	return (
		<div style={{ display: "flex", height: "100%" }}>
			<Wrapper apiKey={`${REACT_APP_GOOGLE_CLOUD_API_KEY}`} render={render}>
				<Map
					onClick={clickable ? handleClickMap : undefined}
					center={{ lat, lng }}
					zoom={5}
					style={{
						flexGrow: "1",
						height: "100%",
						minHeight: "300px",
						borderRadius: "8px",
					}}
				>
					<Marker position={clickable ? center : { lat, lng }} />
				</Map>
			</Wrapper>
		</div>
	);
};
