import React, { Component } from 'react';
import { connect } from 'react-redux';

import { chooseGroup } from './actions'
import ChatDialog from './ChatDialog'
import ChatsList from './ChatsList'

const containerStyle = {
  height: '100%',
  width: '100%',
};

class Chats extends Component {

  chooseGroup = (groupId) => {
    return this.props.dispatch(chooseGroup(groupId))
  }

  render() {
    const { chosenGroupId } = this.props

    if(chosenGroupId)  {
      return <ChatDialog style={containerStyle} />
    }
    
    return (<ChatsList style={containerStyle}/>)
  }
}

const mapStateToProps = function (state) {
  return {
    chosenGroupId: state.chosenGroupId
  };
};

export default connect(mapStateToProps)(Chats);
