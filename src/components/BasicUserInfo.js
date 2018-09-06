import React from 'react';
import propTypes from 'prop-types';

const BasicUserInfo = ({ username, image }) => (
  <div>
    <img src={image} alt={username} />
    <strong>{username}</strong>
  </div>
);

BasicUserInfo.propTypes = {
  username: propTypes.string.isRequired,
  image: propTypes.string
};

BasicUserInfo.defaultProps = {
  image: 'defaultImageUrl',
};

export default BasicUserInfo;
