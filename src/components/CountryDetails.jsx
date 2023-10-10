import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CountryDetails = () => {
	const { countryName } = useParams();

	const [countryData, setCountryData] = useState(null);

	useEffect(() => {
		async function fetchCountryDetails() {
			try {
				const response = await fetch(
					`http://localhost:8000/countryFull?country=${countryName}`
				);
				const data = await response.json();
				setCountryData(data[0]); // assuming the API returns an array
			} catch (error) {
				console.error("Error fetching country details:", error);
			}
		}

		fetchCountryDetails();
	}, [countryName]);

	return (
		<div>
			{countryData && (
				<div>
					<h2>{countryData.name.official}</h2>
					<img
						src={countryData.flags.png}
						alt={`Flag of ${countryData.name.common}`}
					/>
					<p>{countryData.name.common}</p>
					<h3>{countryData.flag}</h3>
				</div>
			)}
		</div>
	);
};

export default CountryDetails;
