import React from "react";
import { useState, memo } from "react";

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

export default memo(Form);
