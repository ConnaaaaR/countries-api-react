import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Form from "./components/Form";
import CountryDetails from "./components/CountryDetails";
import CountryCard from "./components/CountryCard";

function App() {
	const [data, setData] = useState(null);
	const [country, setCountry] = useState("");
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	async function fetchData() {
		const backendURL = import.meta.env.VITE_BACKEND_URL;
		console.log(backendURL);
		try {
			const response = await fetch(
				`${backendURL}findCountry?country=${country}`
			);
			const countryData = await response.json();
			setData(countryData);

			navigate(`/`);
		} catch (err) {
			console.error(err);
			setError("Error Returning country, check console. ");
		}
	}

	return (
		<>
			<a href="/">
				<img src="/gis_earth-north-o.svg" alt="Icon of the earth" />
			</a>
			<h1>WhatInTheWorld?!</h1>
			<Form fetchData={fetchData} setCountry={setCountry} />

			<Routes>
				<Route
					path="/"
					element={
						<>
							{error && <p style={{ color: "red" }}>{error}</p>}
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
			<footer className="footer">&copy; Connor Mattless, 2023</footer>
		</>
	);
}

export default App;
