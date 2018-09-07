import React from 'react';
import propTypes from 'prop-types';
import { Image } from 'semantic-ui-react';

const BasicUserInfo = ({ username, image }) => (
  <div>
    <Image
      src={typeof image === 'string' ? image : 'defaultImageUrl'}
      alt={username}
      circular
      verticalAlign="middle"
      size="tiny"
    />
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
