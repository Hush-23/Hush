import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard.jsx';
import { setActiveConversations } from '../actions/actions';

/**
 * Maps dispatch to props & connects with Login component
 * Maps state from redux store to props - activeConversations & loggedIn
 */

const mapDispatchToProps = dispatch => ({
  setActiveConversations: (users) => {
    dispatch(setActiveConversations(users));
  },
});

export const Dashboard_Container = connect(state => ({
  activeConversations: state.activeConversations,
  loggedIn: state.user.loggedIn,
  email: state.user.email
}), mapDispatchToProps)(Dashboard);