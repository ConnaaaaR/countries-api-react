import PropTypes from "prop-types";

const Form = ({ fetchData, setCountry }) => {
	const clickHandler = (e) => {
		e.preventDefault();
		fetchData();
	};

	return (
		<>
			<div>
				<form className="search-form" onSubmit={clickHandler}>
					<input
						type="text"
						id="country"
						name="country"
						onChange={(e) => setCountry(e.target.value)}
					/>
					<button type="submit">Search Countries</button>
				</form>
			</div>
		</>
	);
};

Form.propTypes = {
	fetchData: PropTypes.func.isRequired,
	setCountry: PropTypes.func.isRequired,
};

export default Form;
