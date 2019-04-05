import React, { Component } from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

import { chooseGroup } from './actions'

const containerStyle = {
  height: '100%',
  width: '100%',
};

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  chat: {
    margin: '20px',
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: '15px',
    borderWidth: '3px',
  }
};

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
    const { restaraunts } = this.props;
    let groupsList = null;

    if (restaraunts) {
      groupsList = Object.keys(restaraunts).map((restarauntId) => {
        const lastMessage = restaraunts[restarauntId].groups[0].messages[restaraunts[restarauntId].groups[0].messages.length - 1]
        return <div key={restarauntId}>
          <ListItem 
            style={styles.chat}
            onClick={() => this.chooseGroup(restarauntId)}
          >
            <p>{restarauntId} </p>
            <p>{lastMessage}</p>
          </ListItem>
          <Divider />
        </div>
      });
    }

    return (
      <Paper style={containerStyle} zDepth={4} >
        <AppBar style={{ textAlign: "center" }} showMenuIconButton={true} title="React Chat" />
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
    restaraunts: state.restaraunts,
  };
};

export default connect(mapStateToProps)(Chat);
