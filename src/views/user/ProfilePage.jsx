import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProfile } from '../../actions/profile';
import Profile from '../../components/Profile.jsx';

/**
 * profile page
 * @return {string} rendered profile page
 */
export class ProfilePage extends Component {
  /**
   * dispatch the getprofile action when page load
   * @returns { object } user profile detail
   */
  componentDidMount() {
    const { username } = this.props.match.params;
    const loggedInUser = this.props.userProfile.username;
    if (loggedInUser !== username) {
      this.props.getProfile(`/profiles/${username}`);
    }
  }

  /**
   * render the profile page component and
   * pass down properties to the profile component
   * @returns {string} html string
   */
  render() {
    const { username } = this.props.match.params;
    let { profile } = this.props;
    const loggedInUser = this.props.userProfile.username;
    if (loggedInUser === username) {
      const { userProfile } = this.props;
      profile = userProfile;
    }

    return (
      <div id="profile-page">
        <Profile
          profile={profile}
          username={username}
          owner={this.props.userProfile.username}
          errors={this.props.errors}
        />
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
ProfilePage.propTypes = {
  match: PropTypes.object.isRequired,
  profile: PropTypes.object,
  userProfile: PropTypes.object,
  getProfile: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

ProfilePage.defaultProps = {
  errors: {},
  profile: {},
  userProfile: {},
};

export const mapStateToProps = (state) => {
  const { isLoading, errors, userProfile, profile } = state.profile;
  return {
    isLoading, errors, userProfile, profile,
  };
};

export default connect(mapStateToProps, { getProfile })(ProfilePage);
