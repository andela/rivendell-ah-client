import React from 'react';
import { Redirect } from 'react-router-dom';

import auths from './AuthRoute';

const { AuthService } = auths;

/**
 *
 * The Login component handle the all login operations
 *  @class Login
 *  @returns {undefined} this is a class thus does not return anything
 */
class Login extends React.Component {
    state = {
      redirectToPreviousRoute: false
    };

    login = () => {
      AuthService.authenticate(() => {
        this.setState({ redirectToPreviousRoute: true });
      });
    };

    /**
   * Renders the component
   * @returns {string} - HTML Markup for the component
   */
    render() {
      const { props } = this;
      const { from } = props.location.state || { from: { pathname: '/' } };
      const { redirectToPreviousRoute } = this.state;

      if (redirectToPreviousRoute) {
        return <Redirect to={from} />;
      }

      return (
        <div>
          <p>
You must log in to view the page at
            {' '}
            {from.pathname}
          </p>
          <button type="submit" onClick={this.login}>Log in</button>
        </div>
      );
    }
}

export default Login;
