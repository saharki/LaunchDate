import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import { connect } from 'react-redux';
import { newMsg, chooseGroup } from './actions';

import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import { Button } from '@material-ui/core';

const containerStyle = {
  height: '100%',
  width: '100%',
};

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      open: true,
      response: false,
      endpoint: "http://localhost:3001"
    };
    this.sendMsg = this.sendMsg.bind(this);
  }
  componentDidMount() {
    const { endpoint } = this.state;
    this.socket = socketIOClient(endpoint);
    this.socket.on("msg", (data) => {
      this.props.dispatch(newMsg(data))
    });
  }
  componentDidUpdate() {
    if (this.chatWindow) {
      this.chatWindow.scrollTop = this.chatWindow.scrollHeight;
    }
  }
  sendMsg(msg) {
    const { user, groupId } = this.props
    if(user) {
      this.socket.emit('msg', { message: {text: msg, name: user.name, time: new Date().toISOString()}, groupId });
    }
  }

  goBack = () => this.props.dispatch(chooseGroup(null))

  render() {
    const { messages, groupId, users } = this.props;
    let listItems = null;

    if (messages) {
      listItems = messages.map((msg, index) => {
        return <div key={index}>
          <ListItem >
            <p>{msg.name}: {msg.text}</p>
          </ListItem>
          <Divider />
        </div>
      });
    }

    return (
      <Paper style={containerStyle} zDepth={4} >
        <AppBar style={{ textAlign: "center" }} showMenuIconButton={false} title={groupId}>
        <Button onClick={this.goBack}>{'<-'}</Button>
        </AppBar>
          <div style={{ overflow: "auto" }} ref={elem => this.chatWindow = elem}> 
          <List style={{ height: "350px" }}>
            <Subheader>
              <div>
              users: {users.map((user) => user.name).join(', ')}
              </div>
              Messages:
            </Subheader>
            {listItems}
          </List>
        </div>
        <TextField style={{ position: "absolute", bottom: 0, margin: '10px' }}
          floatingLabelText="Your message:"

          onKeyPress={(e) => {
            if (e.key === 'Enter' && e.target.value.length > 0) {
              this.sendMsg(e.target.value);
              e.target.value = '';
            }
          }}
        />
      </Paper>
    );
  }
}

const mapStateToProps = function (state, props) {
  return {
    messages: state.chosenGroupId && state.restaraunts[state.chosenGroupId].groups[0].messages,
    users: state.chosenGroupId && (state.restaraunts[state.chosenGroupId].groups[0].members || state.restaraunts[state.chosenGroupId].groups[0].users),
    user: state.user,
    groupId: state.chosenGroupId,
  };
};

export default connect(mapStateToProps)(Chat);
