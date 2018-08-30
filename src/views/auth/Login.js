import React from 'react'; 
import { Redirect } from 'react-router-dom';
import auths from './AuthRoute';
const {AuthService} = auths;

class Login extends React.Component {
    state = {
      redirectToPreviousRoute: false
    };
  
    login = () => {
      AuthService.authenticate(() => {
        this.setState({ redirectToPreviousRoute: true });
      });
    };
  
    render() {
      const { from } = this.props.location.state || { from: { pathname: "/" } };
      const { redirectToPreviousRoute } = this.state;
  
      if (redirectToPreviousRoute) {
        return <Redirect to={from} />;
      }
  
      return (
        <div>
          <p>You must log in to view the page at {from.pathname}</p>
          <button onClick={this.login}>Log in</button>
        </div>
      );
    }
  }


// class Login extends React.Component {
//     constructor( props ) {
//         super( props );
//         this.state = {
//             password: '',
//             email: '',
//         };
//     }
//     saveLogin( event ) {
//         this.setState({
//             [event.target.name]: event.target.value
//         });
//     }
 
//     handleLogin( event ) {
//         event.preventDefault();
//         if( this.state.password == 'password'
//             && this.state.email == 'email@gmail.com' ) {
//             DummyLoginState.login();
//             this.props.history.replace( '/' );
//         }
//         else{
//             alert('Invalid login credentials. Try again.');
//         }
//     }
// render() {
//         return (
//             <form onSubmit={ this.handleLogin.bind( this ) }>
//                 <h3>Please sign in</h3>
//                 <input type="email" 
//                 name="email"
//                 placeholder="Email" 
//                 value={ this.state.email } 
//                 onChange={ this.saveLogin.bind( this ) }/>
//                 <input type="password" 
//                 name="password"
//                 placeholder="Type password" 
//                 value={ this.state.password } 
//                 onChange={ this.saveLogin.bind( this ) }/>
                
//                 <button type="submit"> Submit </button>
//             </form>
//         );
//     }
// }



export default Login;