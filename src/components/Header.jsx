import React from 'react';
import { Container } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import authAction from '../actions/authAction';
import { DesktopNav, HamburgerMenu, MobileNav } from './helpers/HeaderHelper';

/**
 * Header component
 */
export class Header extends React.Component {
  /**
   * @returns {null} null
   */
  constructor() {
    super();
    this.state = {
      sideMenuStyles: {
        animationName: '',
        right: '',
      },
      overlayStyles: {
        animationName: '',
        display: '',
        opacity: null,
      },
      showDropDown: false
    };
    this.logout = this.logout.bind(this);
    this.slideIn = this.slideIn.bind(this);
    this.slideOut = this.slideOut.bind(this);
    this.profileImgClick = this.profileImgClick.bind(this);
  }

  /**
   * component did mount
   * @returns {null} null
   */
  componentDidMount() {
    const { history } = this.props;
    history.listen(() => {
      this.setState({ showDropDown: false });
      this.slideOut();
    });
  }

  /**
   * slide in side menu
   * @returns {null} null
   */
  slideIn() {
    this.setState(state => ({
      sideMenuStyles: {
        ...state.sideMenuStyles,
        animationName: 'slide-in',
        right: '0px'
      }
    }));
    this.setState(state => ({
      overlayStyles: {
        ...state.overlayStyles,
        animationName: 'appear',
        display: 'block',
        opacity: 1
      }
    }));
  }

  /**
   * slide out side menu
   * @returns {null} null
   */
  slideOut() {
    this.setState(state => ({
      sideMenuStyles: {
        ...state.sideMenuStyles,
        animationName: 'slide-out',
        right: '-300px'
      }
    }));
    this.setState(state => ({
      overlayStyles: {
        ...state.overlayStyles,
        animationName: 'disappear',
        opacity: 0
      }
    }));
    return setTimeout(() => {
      this.setState(state => ({
        overlayStyles: {
          ...state.overlayStyles,
          display: 'none',
        }
      }));
    }, 400);
  }

  /**
   * display drop down menu
   * @returns {null} null
   */
  profileImgClick() {
    const { showDropDown } = this.state;
    if (showDropDown) this.setState({ showDropDown: false });
    else this.setState({ showDropDown: true });
  }

  /**
   * logout
   * @returns {null} null
   */
  logout() {
    const { logout } = this.props;
    return logout();
  }

  /**
   * @returns {Function} jsx
   */
  render() {
    const { token, firstName, image, username } = this.props;
    const { sideMenuStyles, overlayStyles, showDropDown } = this.state;
    return (
      <nav id="header">
        <Container>
          <DesktopNav
            token={token}
            firstName={firstName}
            image={image}
            logout={this.logout}
            profileImgClick={this.profileImgClick}
            username={username}
            showDropDown={showDropDown}
          />
          <HamburgerMenu slideIn={this.slideIn} />
          <MobileNav
            token={token}
            firstName={firstName}
            image={image}
            logout={this.logout}
            profileImgClick={this.profileImgClick}
            slideOut={this.slideOut}
            username={username}
            sideMenuStyles={sideMenuStyles}
          />
        </Container>
        <div id="overlay" style={{ ...overlayStyles }}>{}</div>
      </nav>
    );
  }
}

Header.propTypes = {
  history: PropTypes.shape({
    listen: PropTypes.func.isRequired
  }).isRequired,
  logout: PropTypes.func.isRequired,
  firstName: PropTypes.string,
  token: PropTypes.string,
  image: PropTypes.string,
  username: PropTypes.string,
};

Header.defaultProps = {
  firstName: '',
  token: '',
  image: '',
  username: ''
};

export const mapStateToProps = (state) => {
  const { token } = state.auth;
  const { firstName, image, username } = state.profile.userProfile;
  return {
    token,
    firstName,
    image,
    username
  };
};

export default connect(mapStateToProps, {
  logout: authAction.logout
})(Header);
