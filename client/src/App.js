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
  height: '500px',
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
    this.socket = socketIOClient(endpoint);
    this.socket.on("msg",(data) => {
        this.props.dispatch(newMsg(data))
    });
  }
  componentDidUpdate(){
      if (this.chatWindow) {
          this.chatWindow.scrollTop = this.chatWindow.scrollHeight;
      }
  }
  sendMsg(msg) {
      this.socket.emit('msg', msg);
  }
  render() {
    const { messages } = this.props;
    let listItems = null;

    if (messages) {
        listItems = messages.map((msg, index) => {
        return <div key={index}>
            <ListItem >
                <p>{msg}</p>
            </ListItem>
            <Divider />
        </div>
        });
    }

    return (
      <div className="main" style={{ textAlign: "center", fontFamily: "Roboto", backgroundColor: "#3949AB" }}>
        <Paper style={style} zDepth={4} >
            <AppBar style={{ textAlign: "center" }} showMenuIconButton={false} title="React Chat"/>
            <div className ="chat" ref={elem => this.chatWindow = elem}>
                <List style={{height: "350px"}}>
                    <Subheader>Messages:</Subheader>
                    {listItems}
                </List>
            </div>
            <TextField style={{ position: "absolute", bottom: 0, margin: '10px'}}
            floatingLabelText="Your message:"

            onKeyPress={(e) => {
                if (e.key === 'Enter' && e.target.value.length > 0) {
                    this.sendMsg(e.target.value);
                    e.target.value = '';
                }
            }}
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
