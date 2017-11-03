import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import './App.css';

import CircularProgress from 'material-ui/CircularProgress';
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
  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("welcome", data => this.setState({ msg: data }));
  }
  render() {
    const { msg } = this.state;
    return (
      <div className="main" style={{ textAlign: "center", fontFamily: "Roboto", backgroundColor: "#3949AB" }}>
        <Paper style={style} zDepth={4} >
            <AppBar  showMenuIconButton={false} title="React Chat"/>
            <List>
                <Subheader inset={true}>Messages:</Subheader>
                <ListItem >New Message: {msg}</ListItem>
                <Divider />
                <ListItem  primaryText="Peter Carlsson" />
            </List>
            <TextField style={{ position: "absolute", bottom: 0, margin: '10px'}}
            hintText="Chat away!"
            floatingLabelText="Your message:"
            multiLine={true}
            rows={2}
            fullWidth={true}
            />
        </Paper>
      </div>
    );
  }
}

export default App;
