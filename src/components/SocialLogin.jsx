import React from 'react';
import PropTypes from 'prop-types';

const SocialLogin = ({ socialMedia }) => {
  let host = 'https://authorhaven.herokuapp.com';
  if (process.env.NODE_ENV === 'development') {
    host = 'http://localhost:3000';
  }
  return (
    socialMedia.map(platform => (

      <div key={platform.id} className={platform.divClass}>
        <a href={`${host}${platform.link}`}>
          <span>
            <i className={platform.iconClass} />
          </span>
          <p>{platform.text}</p>
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
    iconClass: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};
export default SocialLogin;
