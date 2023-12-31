import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const RandomCountryButton = ({ setData, setError, setLoading, setCountry }) => {
	const navigate = useNavigate();

	const fetchRandomCountry = async () => {
		axios
			.get(`https://restcountries.com/v3.1/all`)
			.then((response) => {
				let randNum = Math.floor(Math.random() * response.data.length);
				setLoading(true);
				setCountry(null);
				const countryData = response.data[randNum];
				if (countryData.error && countryData.error.status === 404) {
					setError("Error: cannot find country");
				} else {
					setData(countryData);
					setCountry(countryData.name);
					navigate(`/country/${countryData.name.common}`);
					setError(null);
					setCountry("");
				}
				setLoading(false);
			})
			.catch((err) => {
				console.error(err);
				setError("Error Returning country, check console or try again.");
				setLoading(false);
			});
	};

	return <button onClick={fetchRandomCountry}>Random Country</button>;
};

export default RandomCountryButton;
