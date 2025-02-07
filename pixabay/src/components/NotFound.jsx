import React from 'react';
import PropTypes from 'prop-types';

const ErrorPage = ({ message }) => {
  return (
    <div className="error-video">
      <video autoPlay muted loop id="myVideo">
        <source src="../src/assets/glitch.mp4" type="video/mp4" />
      </video>
      <h2>{message}</h2>
    </div>
  );
};
ErrorPage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorPage;