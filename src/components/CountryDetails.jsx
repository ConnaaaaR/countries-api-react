import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CountryDetails = () => {
	const { countryName } = useParams();

	const [countryData, setCountryData] = useState(null);
	const [weatherData, setWeatherData] = useState(null);

	///////////////////////////////
	// 		VVV	API Gets VVV	 //
	///////////////////////////////

	// fetches detailed country data from api
	async function fetchCountryDetails() {
		const backendURL = import.meta.env.VITE_BACKEND_URL;

		axios
			.get(`${backendURL}countryFull?country=${countryName}`)
			.then((response) => {
				if (!Array.isArray(response.data)) {
					return console.error("unexpected data shape");
				}

				setCountryData(response.data[0]);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	// fetches country weather data from api
	async function fetchCountryWeather() {
		const weatherApiKey = import.meta.env.VITE_WEATHER_KEY;
		axios
			.get(
				`https://api.openweathermap.org/data/2.5/weather?lat=${countryData.latlng[0].toFixed(
					2
				)}&lon=${countryData.latlng[1].toFixed(
					2
				)}&appid=${weatherApiKey}&units=metric`
			)
			.then((response) => {
				console.log(response.data);
				setWeatherData(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	///////////////////////////////
	// 		VVV	UTILS VVV 		 //
	///////////////////////////////

	// parses the country currency
	const currencyParser = () => {
		if (countryData) {
			const currencyKey = Object.keys(countryData.currencies)[0];
			const currencyName = countryData.currencies[currencyKey].name;
			return currencyName;
		}
	}

	// parses the country languages
	const languageParser = () => {
		let langCap = 5;
		if (!countryData.languages) {
			return "No official language";
		}
		let languages = Object.values(countryData.languages);
		if (languages.length > 5) {
			let len = languages.length;
			languages = languages.splice(0, langCap);
			return `${languages.toString()} and ${len - langCap} more...`;
		} else {
			return languages.toString();
		}
	};

	// fetches country details on mount and when countryName changes
	useEffect(() => {
		fetchCountryDetails();
	}, [countryName]);

	// fetches country weather when countryData changes
	useEffect(() => {
		if (countryData) {
			fetchCountryWeather();
		}
	}, [countryData]);

	/* ^^^^^^^^^^^^^^^^
	 This was the only way I could get this to work without running into errors. Its ugly, I know :( 
	*/

	// JSX layout for displaying country details and weather information
	return (
		<div className="details-container">
		  <img className="flag-image" src={countryData.flags.png} alt={`Flag of ${countryData.name.common}`} />
		  <div className="flex-item">
			<div className="details-header-info-container">
			  <h2>
				{countryData.name.official}
				<a className="map-pin" href={countryData.maps.googleMaps} target="_blank" rel="noreferrer noopener">
				  <img src="/bxs_map.svg" alt="google maps location of country" />
				</a>
			  </h2>
			  {countryData.capital && (
				<>
				  <p><b>Capital:</b> {countryData.capital}</p>
				  <p><b>Currency:</b> {currencyParser()}</p>
				</>
			  )}
			</div>
			<div className="detailed-info-container">
			  <p><b>Population:</b> {new Intl.NumberFormat().format(countryData.population)}</p>
			  <p><b>Language(s):</b> {languageParser()}</p>
			  <p><b>Region:</b> {countryData.region}</p>
			  <p><b>Sub-region:</b> {countryData.subregion ? countryData.subregion : "None"}</p>
			</div>
			{weatherData && (
			  <div className="detailed-info-container">
				<h3>Weather Information</h3>
				<p><b>Temperature:</b> {Math.round(weatherData.main.temp)}°C</p>
				<p><b>Weather:</b> {weatherData.weather[0].description}</p>
				<p><b>Wind Speed:</b> {weatherData.wind.speed.toFixed(1)} m/s</p>
			  </div>
			)}
		  </div>
		</div>
	  );
	};

export default CountryDetails;
