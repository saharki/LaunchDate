import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import './App.css';

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
      <div style={{ textAlign: "center", fontFamily: "Roboto" }}>
        <p>New Message: {msg}</p>

      </div>
    );
  }
}

export default App;
