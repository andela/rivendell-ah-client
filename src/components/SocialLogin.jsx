import React from 'react';
import PropTypes from 'prop-types';

const SocialLogin = ({ socialMedia }) => {
  let host = 'https://authorhaven.herokuapp.com';
  if (process.env.NODE_ENV === 'development') {
    host = 'http://localhost:3000';
  }
  return (
    socialMedia.map(platform => (

      <div key={platform.id} className="divWidth">
        <a href={`${host}${platform.link}`} className="linkClass">
          <span className={platform.iconSpanClass}>
            <i className={platform.iconClass} />
          </span>
          <span className={platform.textClass}>{platform.text}</span>
        </a>
      </div>
    ))
  );
};
SocialLogin.propTypes = {
  socialMedia: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    link: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    textClass: PropTypes.string.isRequired,
    iconClass: PropTypes.string.isRequired,
    iconSpanClass: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};
export default SocialLogin;
