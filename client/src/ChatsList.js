import React, { Component } from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

import { chooseGroup } from './actions'

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      open: true,
      response: false,
      endpoint: "http://localhost:3001"
    };
  }
  
  chooseGroup = (groupId) => this.props.dispatch(chooseGroup(groupId))

  render() {
    const { groups } = this.props;
    let groupsList = null;

    if (groups) {
      groupsList = Object.keys(groups).map((groupId) => {
        const lastMessage = groups[groupId].messages[groups[groupId].messages.length - 1]
        return <div key={groupId}>
          <ListItem 
            onClick={() => this.chooseGroup(groupId)}
          >
            <p>{groupId} </p>
            <p>{lastMessage}</p>
          </ListItem>
          <Divider />
        </div>
      });
    }

    return (
      <Paper zDepth={4} >
        <AppBar style={{ textAlign: "center" }} showMenuIconButton={false} title="React Chat" />
        <div style={{ overflow: "auto" }} ref={elem => this.chatWindow = elem}>
          <List style={{ height: "350px" }}>
            <Subheader>Groups:</Subheader>
            {groupsList}
          </List>
        </div>
      </Paper>
    );
  }
}

const mapStateToProps = function (state, props) {
  return {
    groups: state.groups,
  };
};

export default connect(mapStateToProps)(Chat);
