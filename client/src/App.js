import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import './App.css';
import { connect } from 'react-redux';
import { newMsg } from './actions';

import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

const style = {
  height: '80%',
  width: '60%',
  margin: 50,
  textAlign: 'left',
  display: 'inline-block',
  position: 'relative'
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://localhost:3001"
    };
    this.sendMsg = this.sendMsg.bind(this);
  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("welcome",(data) => {
        this.props.dispatch(newMsg(data))
        console.log(data)
    });
  }
  sendMsg() {

  }
  render() {
    let messages = this.props.messages ? this.props.messages : null;

    return (
      <div className="main" style={{ textAlign: "center", fontFamily: "Roboto", backgroundColor: "#3949AB" }}>
        <Paper style={style} zDepth={4} >
            <AppBar style={{ textAlign: "center" }} showMenuIconButton={false} title="React Chat"/>
            <List>
                <Subheader>Messages:</Subheader>
                <ListItem insetChildren={true} >New Message: {messages && messages[0]}</ListItem>
                <Divider />
                <ListItem insetChildren={true} >New Message: {messages && messages[0]}</ListItem>
            </List>
            <TextField style={{ position: "absolute", bottom: 0, margin: '10px'}}
            floatingLabelText="Your message:"
            />
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = function(state){
    return {
        messages: state.messages
    };
};

export default connect(mapStateToProps)(App);
