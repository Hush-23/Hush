import { connect } from 'react-redux';
import Login from '../components/Login.jsx';
import { login, signup } from '../actions/actions';

/**
 * Maps dispatch to props & connects with Login component 
 */

const mapDispatchToProps = dispatch => ({
  login: (email) => {
    dispatch(login(email));
  },
  signup: (email) => {
    dispatch(signup(email));
  }
});

export const Login_Container = connect(() => ({}), mapDispatchToProps)(Login);