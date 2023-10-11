import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const CountryCard = ({ data }) => {
	return (
		<Link to={`/country/${data.name.common}`}>
			<div className="box">
				<h3>{data.name.official}</h3>
				<img src={data.flags.png} alt={`Flag of ${data.name.common}`} />
				<p>
					<b>Population: </b>
					{data.population}
				</p>
				<p>
					<b>Capital: </b>
					{data.capital}
				</p>
			</div>
		</Link>
	);
};

// define the prop types for the data and its children
CountryCard.propTypes = {
	data: PropTypes.shape({
		name: PropTypes.shape({
			common: PropTypes.string.isRequired,
			official: PropTypes.string.isRequired,
		}).isRequired,
		flags: PropTypes.shape({
			png: PropTypes.string.isRequired,
		}).isRequired,
	}).isRequired,
};

export default CountryCard;
