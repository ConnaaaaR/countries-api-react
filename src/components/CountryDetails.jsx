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
		let langCap = 5; // sets highest amount of displayed langauges
		if (!countryData.languages) {
			return "No official langauge";
		}
		let languages = Object.values(countryData.languages);

		if (languages.length > 5) {
			let len = languages.length;
			// console.log(languages);
			languages = languages.splice(0, langCap);
			return `${languages.toString()} and ${len} more...`;
		} else {
			return languages.toString();
		}
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
							<h2>
								{countryData.name.official}
								<a
									className="map-pin"
									href={countryData.maps.googleMaps}
									target="_blank"
									rel="noreferrer noopener"
								>
									<img
										src="/bxs_map.svg"
										alt="google maps location of country"
									/>
								</a>
							</h2>
							{countryData.capital && (
								<>
									<p>
										<b>Capital:</b> {countryData.capital}
									</p>
									<p>
										<b>Currency:</b> {currencyParser()}
									</p>
								</>
							)}
						</div>

						<div className="detailed-info-container">
							<p>
								<b>Population:</b>{" "}
								{new Intl.NumberFormat().format(countryData.population)}
							</p>

							<p>
								{" "}
								<b>Language(s): </b>
								{languageParser()}
							</p>

							<p>
								{" "}
								<b>Region:</b> {countryData.region}
							</p>

							<p>
								<b>Sub-region:</b>{" "}
								{countryData.subregion ? countryData.subregion : "None"}
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default CountryDetails;
