import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CountryDetails = () => {
	const { countryName } = useParams();

	const [countryData, setCountryData] = useState(null);

	const currencyParser = () => {
		if (countryData) {
			// the name of the currency child object changes based on the country so keys must be used here...
			const currencyKey = Object.keys(countryData.currencies)[0];
			const currencyName = countryData.currencies[currencyKey].name;
			return currencyName;
		}
	};

	async function fetchPort() {
		try {
			const response = await fetch("/api/config");
			const data = await response.json();
			console.log("Backend is running on port:", data.port);
			return data.port;
		} catch (error) {
			console.error("Error fetching the port:", error);
		}
	}

	useEffect(() => {
		async function fetchCountryDetails() {
			try {
				const port = process.env.port;
				const response = await fetch(
					`https://countries-react-app-41e6305a2b31.herokuapp.com:${port}/countryFull?country=${countryName}`
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
				<div className="details-container">
					<img
						className="flag-image"
						src={countryData.flags.png}
						alt={`Flag of ${countryData.name.common}`}
					/>
					<div className="flex-item">
						<h2>{countryData.name.official}</h2>
						<h3>Capital: {countryData.capital}</h3>
						<h4>Currency: {currencyParser()}</h4>
						<p>
							Population:{" "}
							{new Intl.NumberFormat().format(countryData.population)}
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default CountryDetails;
