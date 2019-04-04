import React, { Component } from 'react';
import { connect } from 'react-redux';

import Chats from './Chats'

const containerStyle = {
  height: '812px',
  width: '375px',
  margin: 50,
  textAlign: 'left',
  display: 'inline-block',
  position: 'relative'
};

class App extends Component {
  render() {
    return (
      <div style={containerStyle}>
        <Chats/>
      </div>
    );
  }
}

const mapStateToProps = function (state) {
  return {};
};

export default connect(mapStateToProps)(App);
