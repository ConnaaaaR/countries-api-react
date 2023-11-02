import PropTypes from "prop-types";

function ErrorMessage({ message }) {
	return message ? <p className="error">{message}</p> : null;
}

ErrorMessage.propTypes = {
	message: PropTypes.string,
};

export default ErrorMessage;
