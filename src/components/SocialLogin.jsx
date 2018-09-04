import React from 'react';
import PropTypes from 'prop-types';

const SocialLogin = ({ socialMedia }) => {
  const host = 'https://authorhaven.herokuapp.com';
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
    id: PropTypes.number,
    link: PropTypes.string,
    text: PropTypes.string,
    divClass: PropTypes.string,
    iconClass: PropTypes.string,
  })),
};
SocialLogin.defaultProps = {
  socialMedia: []
};
export default SocialLogin;
