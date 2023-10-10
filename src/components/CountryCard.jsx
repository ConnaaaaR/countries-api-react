import { Link } from "react-router-dom";

const CountryCard = ({ data }) => {
	return (
		<Link to={`/country/${data.name.common}`}>
			<div className="box">
				<h2>{data.name.official}</h2>
				<img src={data.flags.png} alt={`Flag of ${data.name.common}`} />
				<p>{data.name.common}</p>
				<h3>{data.flag}</h3>
			</div>
		</Link>
	);
};
export default CountryCard;
