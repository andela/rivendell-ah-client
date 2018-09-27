import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * @param { object } profile to be renderd
 * @param { string } owner the logged in user
 * @param { bool } errors from loading user profile
 * @returns { string } html string
 */
const Profile = ({ profile, owner, errors }) => {
  const { firstName, lastName, bio, username, email, image } = profile;
  let biography = 'Bio';
  let bioText = bio;
  let updateButton = '';
  if (owner === username) {
    updateButton = (
      <Link id="update-profile-link" to={`/@${username}/edit`}>
        Edit your Profile
      </Link>
    );
  }
  if (owner !== username) {
    updateButton = '';
  }
  if (!bio && (owner === username)) {
    bioText = `You have not added you biograpphy.
    Edit your profile and add you biograhpy`;
  }
  if (!bio && (owner !== username)) {
    biography = '404 bio not found';
  }
  let imageEle =
    <img id="profile-image" src={image} alt={username} />;
  if (!image) {
    imageEle = (
      <i id="alternate-profile-image" className="large material-icons">
        account_circle
      </i>
    );
  }

  let displayError = '';
  if (owner !== username && errors.message) {
    const { message } = errors;
    let displayMessage = '';
    if (message === 'User not found') {
      displayMessage = 'The user you are looking for does not exist';
    }

    if (message === 'Network Error') {
      displayMessage =
      'The server is down at the moment. Please try again later.';
    }
    displayError = <p id="profile-error-message">{displayMessage}</p>;
  }

  return (
    <div className="content">
      <div id="profile-header">
        <div id="profile-image-div">
          {imageEle}
        </div>
        <h3 id="profile-name">
          {firstName}
          {' '}
          {lastName}
        </h3>
        {displayError}
        <p id="email-text">{email}</p>
      </div>
      <div className="profile-detail-container">
        <div className="profile-details">
          <p id="bio-field">{biography}</p>
          <p id="bio-text">{bioText}</p>
        </div>
        {updateButton}
      </div>
    </div>
  );
};

/* eslint-disable react/forbid-prop-types */
Profile.propTypes = {
  errors: PropTypes.object,
  profile: PropTypes.object,
  owner: PropTypes.string.isRequired,
};

Profile.defaultProps = {
  errors: {},
  profile: {},
};

export default Profile;
