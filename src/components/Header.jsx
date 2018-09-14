import React from 'react';
import { Container, Form, Button, Icon, Dropdown } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import Logout from './Logout';

/**
 * Header component
 */
class Header extends React.Component {
  /**
   * component did mount
   * @returns {null} null
   */
  componentDidMount = () => {
    const { history } = this.props;
    history.listen(() => {
      document.querySelector('.dropdown').classList.add('hide');
      if (document.querySelector('.side-menu').hasAttribute('style')) {
        this.slideOut();
      }
    });
  }

  /**
   * slide in side menu
   * @returns {null} null
   */
  slideIn = () => {
    document.querySelector('.side-menu').style.animationName = 'slide-in';
    document.getElementById('overlay').style.animationName = 'appear';
    document.querySelector('.side-menu').style.right = '0px';
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('overlay').style.opacity = 1;
  }

  profileImgClick = () => {
    document.querySelector('.dropdown').classList.toggle('hide');
  }

  /**
   * slide out side menu
   * @returns {null} null
   */
  slideOut = () => {
    document.querySelector('.side-menu').style.animationName = 'slide-out';
    document.getElementById('overlay').style.animationName = 'disappear';
    document.querySelector('.side-menu').style.right = '-300px';
    setTimeout(() => {
      document.getElementById('overlay').style.display = 'none';
    }, 400);
    document.getElementById('overlay').style.opacity = 0;
  }

  /**
   * @returns {Function} jsx
   */
  render() {
    const { token } = this.props;
    return (
      <nav id="header">
        <Container>
          <div className="main-nav">
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
            <div className="not-mobile">
              <ul className="right-menu">
                <li>
                  <div className="search-box">
                    <Form>
                      <Form.Field>
                        <input type="search" placeholder="search articles" />
                      </Form.Field>
                      <Button><i className="material-icons">search</i></Button>
                    </Form>
                  </div>
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
                            <Button size="tiny" id="yo">Get started</Button>
                          </Link>
                        </li>
                      </div>
                    )
                    : (
                      <div>
                        <li><i className="material-icons">notifications_none</i></li>
                        <li className="dropdown-wrapper">
                          <i className="material-icons profile-img" onClick={this.profileImgClick}>account_circle</i>
                          <ul className="dropdown hide">
                            <div>
                              <li><p>Name</p></li>
                              <li>
                                <Link to="/">
                                  {/* <i className="material-icons">person_outline</i> */}
                                  <span>Profile</span>
                                </Link>
                              </li>
                            </div>
                            <div>
                              <li><Link to="#">logout</Link></li>
                            </div>
                          </ul>
                        </li>
                      </div>
                    )
                }
              </ul>
            </div>
            <div className="clear-fix" />
          </div>
          <div className="mobile hamburger-menu">
            <i
              className="material-icons"
              onClick={this.slideIn}
            >
              menu
            </i>
          </div>
          <div className="mobile menu">
            <div className="side-menu">
              <div className="close-menu">
                <i
                  className="material-icons"
                  onClick={this.slideOut}
                >
                  close
                </i>
              </div>
              <div className="search-box">
                <Form>
                  <Form.Field>
                    <input type="search" placeholder="search articles" />
                  </Form.Field>
                  <Button><i className="material-icons">search</i></Button>
                </Form>
              </div>
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
                          <Link to="/">
                            <li><i className="material-icons">notifications_none</i></li>
                          </Link>
                          <Link to="/articles">
                            <li><i className="material-icons">account_circle</i></li>
                          </Link>
                        </div>
                      )
                  }
                </ul>
              </div>
            </div>
          </div>
        </Container>
        <div id="overlay">{}</div>
      </nav>
    );
  }
}

Header.propTypes = {
  history: PropTypes.shape({
    listen: PropTypes.func.isRequired
  }).isRequired
};

const mapStateToProps = (state) => {
  const { token } = state.auth;
  return {
    token
  };
};

export default connect(mapStateToProps)(Header);
