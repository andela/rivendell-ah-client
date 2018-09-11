import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SocialLogin from '../../components/SocialLogin';
import authAction from '../../actions/authAction';
import redirectAction from '../../actions/redirectAction';
import getUrlParamHelper from '../../helpers/getUrlParamsHelper';


/**
 *
 * The Login component handle the all login operations
 *  @class Login
 *  @returns {undefined} this is a class thus does not return anything
 */
export class Login extends React.Component {
  state = {
    socialMediaPlatforms: [
      {
        id: 1,
        link: '/api/auth/google',
        text: 'Sign in with Google',
        textClass: 'googleTextDesign social-right-pad socialfont',
        iconClass: 'google icon',
        iconSpanClass: 'googleIconDesign socialfont'
      },
      {
        id: 2,
        link: '/api/auth/linkedin',
        text: 'Sign in with Linkedin',
        textClass: 'linkedInTextDesign social-right-pad socialfont',
        iconClass: 'linkedin icon',
        iconSpanClass: 'linkedInIconDesign socialfont'
      },
      {
        id: 3,
        link: '/api/auth/facebook',
        text: 'Sign in with Facebook',
        textClass: 'facebookTextDesign social-right-pad socialfont',
        iconClass: 'facebook f icon',
        iconSpanClass: 'facebookIconDesign socialfont'
      }
    ],

  }


  /**
  * ComponentWillMount lifecycle
  * @returns {string} - HTML Markup for the component
  */
  componentDidMount() {
    this.socialLogin();
  }


  /**
  * ComponentWillMount lifecycle
  * @returns {string} - HTML Markup for the component
  */
  componentWillUnmount() {
    localStorage.removeItem('redirectRoute');
    localStorage.removeItem('urlParams');
  }

  socialLogin = () => {
    const { location, history } = this.props;
    const urlParams = location.search.substring(1);
    if (urlParams) {
      localStorage.setItem('urlParams', urlParams);
      history.replace('/login');
    }

    const retrievedParams = localStorage.getItem('urlParams');
    if (retrievedParams) {
      const user = {
        email: '',
        image: '',
        firstName: '',
        lastName: '',
        bio: '',
        token: '',
        username: '',
      };

      Object.keys(user).forEach((element) => {
        user[element] = getUrlParamHelper(element, location);
      });

      // dispatch to token and decoded token to store
      const { socialLogin } = this.props;
      socialLogin(user);

      // redirect to default home route or previous route
      const redirectRoute = localStorage.getItem('redirectRoute');
      if (redirectRoute) {
        const { socialLoginRedirect } = this.props;
        socialLoginRedirect(redirectRoute);
      }
    }
  }

  /**
  * Renders the component
  * @returns {string} - HTML Markup for the component
  */
  render() {
    const { socialMediaPlatforms } = this.state;

    return (
      <div id="social-login">
        <SocialLogin socialMedia={socialMediaPlatforms} />
      </div>
    );
  }
}
Login.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string
  }),
  history: PropTypes.shape({
    replace: PropTypes.func
  }),
  socialLoginRedirect: PropTypes.func.isRequired,
  socialLogin: PropTypes.func.isRequired,
};

Login.defaultProps = {
  location: {},
  history: {},
};

export const mapStateToProps = (state) => {
  const { token } = state.auth;
  const { redirectUrl } = state.redirect;
  return {
    token,
    redirectUrl,
  };
};

export default connect(mapStateToProps, {
  socialLoginRedirect: redirectAction.socialLoginRedirect,
  socialLogin: authAction.socialLogin
})(Login);
