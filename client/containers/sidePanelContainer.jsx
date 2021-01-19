import { connect } from 'react-redux';
import Sidepanel from '../components/Sidepanel.jsx';
import { initiateConversation, setActiveChat } from '../actions/actions.js';

const mapDispatchToProps = dispatch => ({
  initiateConversation: (email) => {
    dispatch(initiateConversation(email));
  } ,
  setActiveChat: (messages) => {
    dispatch(setActiveChat(messages));
  }
});

export const SidePanelContainer = connect((state) => ({activeConversations: state.user.activeConversations, activeChat: state.user.activeChat}), mapDispatchToProps)(Sidepanel);