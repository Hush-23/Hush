import { connect } from 'react-redux';
import Sidepanel from './sidePanel.jsx';
import { getUsers, initiateConversation } from '../actions/actions.js';

const mapDispatchToProps = dispatch => ({
  dispatch: () => {
    dispatch(getUsers());
    dispatch(initiateConversation());
  }
});

export const SidePanelContainer = connect((state) => ({userList: state.user.userList}), mapDispatchToProps)(Sidepanel);