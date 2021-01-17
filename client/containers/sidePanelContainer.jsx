import { connect } from 'react-redux';
import Sidepanel from '../components/Sidepanel.jsx';
import { getUsers, initiateConversation } from '../actions/actions.js';

const mapDispatchToProps = dispatch => ({
  getUsers: () => {
    dispatch(getUsers());
  },
  initiateConversation: (email) => {
    dispatch(initiateConversation(email));
  }
    
  
});

export const SidePanelContainer = connect((state) => ({userList: state.user.userList}), mapDispatchToProps)(Sidepanel);