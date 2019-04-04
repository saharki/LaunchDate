import React, { Component } from 'react';
import { connect } from 'react-redux';

import { chooseGroup } from './actions'
import ChatDialog from './ChatDialog'
// import ChatsList from './ChatsList'

class Chats extends Component {

  chooseGroup = (groupId) => {
    return this.props.dispatch(chooseGroup(groupId))
  }

  render() {
    // const {chosenGroupId} = this.state
    return (
      // {
        // chosenGroupId ? 
        // <ChatsList/> :
        <ChatDialog 
          groupId='vitrina'
        />
      // }
    );
  }
}

const mapStateToProps = function (state) {
  return {
    chosenGroupId: state.chosenGroupId
  };
};

export default connect(mapStateToProps)(Chats);
