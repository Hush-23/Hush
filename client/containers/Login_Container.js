import { connect } from 'react-redux';
import Login from '../components/Login.jsx';
import { login, signup } from '../actions/actions';

/**
 * Maps dispatch to props & connects with Login component 
 */

const mapDispatchToProps = dispatch => ({
  login: (email, password) => {
    dispatch(login({ email, password }));
  },
  signup: (email, username, password) => {
    dispatch(signup({ email, username, password }));
  }
});

export const Login_Container = connect(() => ({}), mapDispatchToProps)(Login);