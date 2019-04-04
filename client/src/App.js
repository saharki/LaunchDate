import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import Chat from './Chat'
import MatchFinder from './MatchFinder'

const App = () => {
  const [chosenRestaraunt, setChosenRestaraunt] = useState(null);

  return <div>
    {
      chosenRestaraunt ?
        <Chat /> :
        <MatchFinder setChosenRestaraunt={(restaraunt) => {
          setChosenRestaraunt(restaraunt);
        }}
        />
    }
  </div>
}

const mapStateToProps = function (state) {
  return {};
};

export default connect(mapStateToProps)(App);
