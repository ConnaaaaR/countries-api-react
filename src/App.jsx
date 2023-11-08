import axios from "axios";
import { useState, useMemo } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import "./styles/App.css";

import Form from "./components/Form";
import CountryDetails from "./components/CountryDetails";
import RandomCountryButton from "./components/RandomCountryButton";
import Header from "./components/Header";
import ErrorMessage from "./components/ErrorMessage";
import RegionFilter from "./components/RegionFilter";
import CountryList from "./components/CountryList";

function App() {
	let navigate = useNavigate();
	const [data, setData] = useState(null);
	const [country, setCountry] = useState("");
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [regionFilter, setRegionFilter] = useState("");

	const filteredData = useMemo(() => {
		if (!data || !regionFilter || !Array.isArray(data)) return data;
		return data.filter(
			(country) => country.region.toLowerCase() === regionFilter
		);
	}, [data, regionFilter]);

	async function fetchData() {
		const backendURL = import.meta.env.VITE_BACKEND_URL;
		axios
			.get(`${backendURL}findCountry?country=${country}`)
			.then((response) => {
				navigate("/");
				setData(null);
				setLoading(true);
				let countryData = response.data;

				if (countryData.error && countryData.error.status === 404) {
					setError("Error: cannot find country");
				} else {
					setData(countryData);
					setError(null);
				}
				setLoading(false);
			})
			.catch((error) => {
				console.error(error);
				setError("Error Returning country, check console or try again");
				setLoading(false);
			});
	}

	return (
		<>
			<Header />
			<ErrorMessage message={error} />
			<Form
				fetchData={fetchData}
				setCountry={setCountry}
				loading={loading}
				country={country}
			/>

			<div className="button-container">
				<RegionFilter onRegionChange={setRegionFilter} />
				<RandomCountryButton
					setData={setData}
					setError={setError}
					setLoading={setLoading}
					setCountry={setCountry}
				/>
			</div>

			<Routes>
				<Route path="/" element={<CountryList data={filteredData} />} />
				<Route path="/country/:countryName" element={<CountryDetails />} />
			</Routes>
		</>
	);
}

export default App;
