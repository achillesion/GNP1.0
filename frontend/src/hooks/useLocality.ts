import {
	Country,
	State,
	City,
	ICountry,
	IState,
	ICity,
} from "country-state-city";
import { FormikValues } from "formik";
import { useEffect, useState } from "react";

export const useLocality = (formik: FormikValues) => {
	const allCountries = Country.getAllCountries();

	const [selectCountry, setSelectCountry] = useState<ICountry>();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [selectState, setSelectState] = useState<IState | null>(null);

	const [statesOfCountry, setStatesOfCountry] = useState<IState[] | null>(null);
	const [citiesOfState, setCitiesOfState] = useState<ICity[] | null>(null);

	useEffect(() => {
		if (formik.values.country !== "") {
			const foundCountry = allCountries.find(
				(country) => country.name === formik.values.country
			);

			if (foundCountry && !selectCountry) {
				setSelectCountry(foundCountry);
				setStatesOfCountry(State.getStatesOfCountry(foundCountry.isoCode));
			}
		}
	}, [allCountries, formik.values.country, selectCountry]);

	useEffect(() => {
		if (formik.values.state !== "" && statesOfCountry) {
			const foundState = statesOfCountry.find(
				(state) => state.name === formik.values.state
			);

			if (foundState) {
				setSelectState(foundState);
				setCitiesOfState(
					City.getCitiesOfState(selectCountry?.isoCode!, foundState.isoCode)
				);
			}
		}
	}, [formik.values.state, selectCountry?.isoCode, statesOfCountry]);

	const handleChangeCountry = (countryName: string) => {
		const foundCountry = allCountries.find(
			(country) => country.name === countryName
		);

		if (foundCountry !== undefined) {
			setSelectCountry(foundCountry);
			setStatesOfCountry(State.getStatesOfCountry(foundCountry.isoCode));

			const phoneCode =
				foundCountry.phonecode.split("")[0] === "+"
					? foundCountry.phonecode
					: `+${foundCountry.phonecode}`;

			formik.setValues({
				...formik.values,
				country: countryName,
				state: "",
				city: "",
				phone: phoneCode,
			});
		}
	};

	const handleChangeState = (stateName: string) => {
		const foundState = statesOfCountry?.find(
			(state) => state.name === stateName
		);

		if (foundState !== undefined && selectCountry !== undefined) {
			setSelectState(foundState);
			const cities = City.getCitiesOfState(
				selectCountry.isoCode,
				foundState.isoCode
			);

			setCitiesOfState(cities);

			formik.setValues({
				...formik.values,
				state: stateName,
				city: "",
			});
		}
	};

	return {
		allCountries,
		statesOfCountry,
		citiesOfState,
		handleChangeCountry,
		handleChangeState,
	};
};
