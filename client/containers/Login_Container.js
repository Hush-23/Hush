import { connect } from 'react-redux';
import Login from '../components/Login.jsx';
import { login, signup, setClientSocket, addNewMessage } from '../actions/actions';

/**
 * Maps dispatch to props & connects with Login component 
 */

const mapDispatchToProps = dispatch => ({
  login: (email) => {
    dispatch(login(email));
  },
  signup: (email) => {
    dispatch(signup(email));
  },
  setClientSocket: (socket) => {
    dispatch(setClientSocket(socket))
  },
  addNewMessage: (messageObj) => {
    dispatch(addNewMessage(messageObj))
  }
});

export const Login_Container = connect(state => ({ 
  activeRecipient: state.user.activeRecipient
 }), mapDispatchToProps)(Login);