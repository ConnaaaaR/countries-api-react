import CountryCard from "./CountryCard";
import PropTypes from "prop-types";

function CountryList({ data }) {
	// Check if data is an array
	const isArray = Array.isArray(data);

	return (
		<div className="countrys-grid-container">
			{data ? console.log(data[0]) : ""}
			{data &&
				isArray &&
				data.map((country) => (
					<CountryCard key={country.ccn3} data={country} />
				))}
			{data && !isArray && <CountryCard key={data.ccn3} data={data} />}
		</div>
	);
}

CountryList.propTypes = {
	data: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.object),
		PropTypes.object,
	]),
};

export default CountryList;
