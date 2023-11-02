import PropTypes from "prop-types";

const Form = ({ fetchData, setCountry, country, loading }) => {
	const clickHandler = (e) => {
		e.preventDefault();
		fetchData();
	};

	return (
		<>
			<div className="form-container">
				<form className="search-form" onSubmit={clickHandler}>
					<div className="input-container">
						<input
							aria-label="country"
							className="search-form-text"
							type="text"
							autoComplete="false"
							name="country"
							onChange={(e) => setCountry(e.target.value)}
						/>

						{loading ? (
							<div className="spinner"></div>
						) : (
							<img className="input-icon" src="/enter-key.svg" />
						)}
					</div>
					<p className="under-text">
						<img src="/bubble-ltr.svg" alt="" />
						&nbsp;Type a country and press enter
					</p>
				</form>
			</div>
		</>
	);
};

Form.propTypes = {
	fetchData: PropTypes.func.isRequired,
	setCountry: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
};

export default Form;
