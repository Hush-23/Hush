import { connect } from 'react-redux';
import Sidepanel from '../components/Sidepanel.jsx';
import { getUsers, initiateConversation, setActiveChat } from '../actions/actions.js';

const mapDispatchToProps = dispatch => ({
  getUsers: () => {
    dispatch(getUsers());
  },
  initiateConversation: (email) => {
    dispatch(initiateConversation(email));
  } ,
  setActiveChat: (messages) => {
    dispatch(setActiveChat(messages));
  }
});

export const SidePanelContainer = connect((state) => ({userList: state.user.userList, activeChat: state.user.activeChat}), mapDispatchToProps)(Sidepanel);