import React from "react";
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
		try {
			const response = await fetch(
				`http://localhost:8000/country?country=${country}`
			);
			const countryData = await response.json();
			setData(countryData);

			navigate(`/`);
		} catch (err) {
			setError("Error Returning country");
		}
	}

	return (
		<>
			<h1>Countries API Search</h1>
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
		</>
	);
}

export default App;
