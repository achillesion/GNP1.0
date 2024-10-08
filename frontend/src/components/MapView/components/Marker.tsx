import React from "react";

export const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
	const [marker, setMarker] = React.useState<google.maps.Marker>();

	React.useEffect(() => {
		if (!marker) {
			setMarker(new google.maps.Marker(options));
		}

		// remove marker from map on unmount
		return () => {
			if (marker) {
				marker.setMap(null);
			}
		};
	}, [marker, options]);

	React.useEffect(() => {
		if (marker) {
			marker.setOptions(options);
		}
	}, [marker, options]);

	return null;
};
