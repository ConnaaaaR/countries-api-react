import PropTypes from "prop-types";

const Form = ({ fetchData, setCountry, loading }) => {
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
							<div class="spinner"></div>
						) : (
							<img className="input-icon" src="/enter-key.svg" />
						)}
					</div>
					<p className="under-text">
						<img src="/bubble-ltr.svg" alt="" />
						&nbsp;Type a country and press enter
					</p>
					{/* <button type="submit">Search Countries</button> */}
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
