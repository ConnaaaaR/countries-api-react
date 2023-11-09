import React from "react";

const Pagination = ({ currentPage, setPage, totalPages }) => {
	const goToPrevPage = () => {
		if (currentPage > 1) {
			setPage(currentPage - 1);
		}
	};

	const goToNextPage = () => {
		if (currentPage < totalPages) {
			setPage(currentPage + 1);
		}
	};

	return (
		<>
			<div className="pagination">
				{currentPage > 1 && (
					<button onClick={goToPrevPage}>&lt; Previous Page</button>
				)}

				{currentPage < totalPages && (
					<button onClick={goToNextPage}>Next Page &gt;</button>
				)}
			</div>
			<span>
				Page {Math.min(currentPage, totalPages)} of {totalPages}
			</span>
		</>
	);
};

export default Pagination;
