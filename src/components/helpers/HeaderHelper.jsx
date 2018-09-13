import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { Form, Button, Icon } from 'semantic-ui-react';

export const Logo = () => (
  <div className="logo">
    <Link to="/">
      <svg
        viewBox="0 0 129 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M64.5 0L129 80H95.0999L78.6047
          60.1212H45.8921L62.3872 80H0L30.7449
          41.8669L41.0642 54.303H73.7769L46.8657 21.8718L64.5 0Z"
          fill="#3498DB"
        />
      </svg>
    </Link>
  </div>
);

export const SearchBar = () => (
  <div className="search-box">
    <Form>
      <Form.Field>
        <input type="search" placeholder="search articles" />
      </Form.Field>
      <Button><i className="material-icons">search</i></Button>
    </Form>
  </div>
);

export const NavProfileImage = ({ image, profileImgClick }) => (
  image
    ? (
      <img
        alt="avatar"
        className="img"
        src={image}
        onClick={profileImgClick}
      />
    )
    : (
      <i
        className="material-icons profile-img"
        onClick={profileImgClick}
      >
      account_circle
      </i>
    )
);

NavProfileImage.propTypes = {
  image: PropTypes.string,
  profileImgClick: PropTypes.func
};

NavProfileImage.defaultProps = {
  image: '',
  profileImgClick: () => {}
};

export const DesktopNavDropDown = ({
  firstName, logout, username, showDropDown
}) => (
  showDropDown ? (
    <ul className="dropdown">
      <div>
        <li><p className="capitalize">{firstName}</p></li>
        <li>
          <Link to={`/@${username}`}>
            <span>Profile</span>
          </Link>
        </li>
      </div>
      <div>
        <li>
          <Link to="#" onClick={logout}>logout</Link>
        </li>
      </div>
    </ul>
  ) : null
);

DesktopNavDropDown.propTypes = {
  firstName: PropTypes.string,
  logout: PropTypes.func,
  username: PropTypes.string,
  showDropDown: PropTypes.bool.isRequired
};

DesktopNavDropDown.defaultProps = {
  username: '',
  firstName: '',
  logout: () => {}
};

export const DesktopNav = ({
  token, image, firstName, logout, profileImgClick, username, showDropDown
}) => (
  <div className="main-nav">
    <Logo />
    <div className="not-mobile">
      <ul className="right-menu">
        <li>
          <SearchBar />
        </li>
        {
          !token
            ? (
              <div className="login-signup">
                <li className="nav-item">
                  <Link to="/login">
                      Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup">
                    <Button size="tiny">Get started</Button>
                  </Link>
                </li>
              </div>
            )
            : (
              <div>
                <li>
                  <i className="material-icons">notifications_none</i>
                </li>
                <li className="dropdown-wrapper">
                  <NavProfileImage
                    image={image}
                    profileImgClick={profileImgClick}
                  />
                  <DesktopNavDropDown
                    firstName={firstName}
                    logout={logout}
                    username={username}
                    showDropDown={showDropDown}
                  />
                </li>
              </div>
            )
        }
      </ul>
    </div>
    <div className="clear-fix" />
  </div>
);

DesktopNav.propTypes = {
  token: PropTypes.string,
  firstName: PropTypes.string,
  logout: PropTypes.func,
  image: PropTypes.string,
  profileImgClick: PropTypes.func,
  username: PropTypes.string,
  showDropDown: PropTypes.bool.isRequired
};

DesktopNav.defaultProps = {
  username: '',
  token: '',
  firstName: '',
  logout: () => {},
  image: '',
  profileImgClick: () => {}
};

export const HamburgerMenu = ({ slideIn }) => (
  <div className="mobile hamburger-menu">
    <i
      className="material-icons"
      onClick={slideIn}
    >
      menu
    </i>
  </div>
);

HamburgerMenu.propTypes = {
  slideIn: PropTypes.func.isRequired
};

export const CloseSideMenuButton = ({ slideOut }) => (
  <div className="close-menu">
    <i
      className="material-icons"
      onClick={slideOut}
    >
      close
    </i>
  </div>
);

CloseSideMenuButton.propTypes = {
  slideOut: PropTypes.func.isRequired
};

export const MobileNav = ({
  slideOut, token, image, profileImgClick,
  firstName, logout, username, sideMenuStyles
}) => (
  <div className="mobile menu">
    <div className="side-menu" style={{ ...sideMenuStyles }}>
      <CloseSideMenuButton slideOut={slideOut} />
      <SearchBar />
      <div className="content-box">
        <ul>
          {
            !token
              ? (
                <div>
                  <Link to="/login">
                    <li>
                      <Icon name="sign-in" />
                      Login
                    </li>
                  </Link>
                  <Link to="/signup">
                    <li>
                      <Icon name="signup" />
                      Get started
                    </li>
                  </Link>
                </div>
              )
              : (
                <div>
                  <li>
                    <NavProfileImage
                      image={image}
                      profileImgClick={profileImgClick}
                    />
                    <span className="first-name">{firstName}</span>
                  </li>
                  <Link to="/articles">
                    <li>
                      <i className="material-icons">notifications_none</i>
                    </li>
                  </Link>
                  <Link to={`/@${username}`}>
                    <li>Profile</li>
                  </Link>
                  <Link to="#" onClick={logout}>
                    <li>logout</li>
                  </Link>
                </div>
              )
          }
        </ul>
      </div>
    </div>
  </div>
);

MobileNav.propTypes = {
  slideOut: PropTypes.func.isRequired,
  token: PropTypes.string,
  firstName: PropTypes.string,
  logout: PropTypes.func,
  image: PropTypes.string,
  profileImgClick: PropTypes.func,
  username: PropTypes.string,
  sideMenuStyles: PropTypes.shape({
    animationName: PropTypes.string.isRequired
  }).isRequired
};

MobileNav.defaultProps = {
  username: '',
  token: '',
  firstName: '',
  logout: () => {},
  image: '',
  profileImgClick: () => {}
};

export default {};
