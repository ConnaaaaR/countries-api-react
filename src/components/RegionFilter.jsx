import PropTypes from "prop-types";

function RegionFilter({ onRegionChange }) {
	return (
		<select
			className="drop-down"
			name="region_filter"
			id="region"
			onChange={(e) => onRegionChange(e.target.value.trim())}
		>
			<option value="">Filter Region</option>
			<option value="africa">Africa</option>
			<option value="americas">Americas</option>
			<option value="asia">Asia</option>
			<option value="europe">Europe</option>
			<option value="oceania">Oceania</option>
		</select>
	);
}

RegionFilter.propTypes = {
	onRegionChange: PropTypes.func.isRequired,
};

export default RegionFilter;
