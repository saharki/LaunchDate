import React, { Component } from 'react';
import { connect } from 'react-redux';

import Chat from './Chat'

class App extends Component {
  render() {
    return (
      <Chat/>
    );
  }
}

const mapStateToProps = function (state) {
  return {};
};

export default connect(mapStateToProps)(App);
