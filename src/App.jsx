import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./styles/App.css";
import Form from "./components/Form";
import CountryDetails from "./components/CountryDetails";
import CountryCard from "./components/CountryCard";

function App() {
	const [data, setData] = useState(null);
	const [country, setCountry] = useState("");
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	async function fetchData() {
		const backendURL = import.meta.env.VITE_BACKEND_URL;
		try {
			setLoading(true);
			const response = await fetch(
				`${backendURL}findCountry?country=${country}`
			);
			const countryData = await response.json();
			setData(countryData);
			setLoading(false);
			navigate(`/`);
		} catch (err) {
			console.error(err);
			setError("Error Returning country, check console or try again. ");
			setLoading(false);
		}
	}

	return (
		<>
			<a href="/">
				<img src="/gis_earth-north-o.svg" alt="Icon of the earth" />
			</a>
			<h1>WhatInTheWorld?!</h1>
			{error ? <p className="error">{error}</p> : ""}
			{data?.error?.status === 404 ? (
				<p className="error">Error: cannot find country</p>
			) : (
				""
			)}
			<Form fetchData={fetchData} setCountry={setCountry} loading={loading} />

			<Routes>
				<Route
					path="/"
					element={
						<>
							<div className="countrys-grid-container">
								{data &&
									data.length > 0 &&
									data.map((i) => <CountryCard key={i.ccn3} data={i} />)}
							</div>
						</>
					}
				/>
				<Route path="/country/:countryName" element={<CountryDetails />} />
			</Routes>
		</>
	);
}

export default App;
