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

	const languageParser = () => {
		let languages = Object.values(countryData.languages);
		return languages.toString();
	};

	useEffect(() => {
		async function fetchCountryDetails() {
			const backendURL = import.meta.env.VITE_BACKEND_URL;
			try {
				const response = await fetch(
					`${backendURL}countryFull?country=${countryName}`
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
						<div className="details-header-info-container">
							<h2>{countryData.name.official}</h2>
							<h3>Capital: {countryData.capital}</h3>
							<h4>Currency: {currencyParser()}</h4>
						</div>

						<div className="detailed-info-container">
							<h5>Detailed Information</h5>
							<p>
								Population:{" "}
								{new Intl.NumberFormat().format(countryData.population)}
							</p>
							<p>Language(s): {languageParser()}</p>
							<p>
								Region: {countryData.region}, Sub-region:{" "}
								{countryData.subregion}
							</p>
							<p>
								<a
									href={countryData.maps.googleMaps}
									target="_blank"
									rel="noreferrer noopener"
								>
									Click here to view country in Google Maps.
								</a>
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default CountryDetails;
