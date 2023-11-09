import React, { useState, useEffect } from "react";
import CountryCard from "./CountryCard";
import Pagination from "./Pagination";
import "../styles/App.css";

const itemsPerPage = 10;

const CountryList = ({ data }) => {
	useEffect(() => {
		setCurrentPage(1);
	}, [data]);

	const [currentPage, setCurrentPage] = useState(1);
	if (!data) return null; // Early return for null data

	// Calculate total number of pages
	const pageCount = Math.ceil(data.length / itemsPerPage);

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentCountries = data.slice(indexOfFirstItem, indexOfLastItem);

	return (
		<>
			<div className="countrys-grid-container">
				{currentCountries.map((country) => (
					<CountryCard key={country.ccn3} data={country} />
				))}
			</div>

			<Pagination
				currentPage={currentPage}
				setPage={setCurrentPage}
				totalPages={pageCount}
			/>
		</>
	);
};

export default CountryList;
