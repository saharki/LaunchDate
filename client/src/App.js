import React, { useState } from 'react';
import { connect } from 'react-redux';

import Chats from './Chats'
import MatchFinder from './MatchFinder'

const containerStyle = {
  height: '812px',
  width: '375px',
  margin: 50,
  textAlign: 'left',
  display: 'inline-block',
  position: 'relative'
};

const App = () => {
  const [chosenRestaraunt, setChosenRestaraunt] = useState(true);

  return <div style={containerStyle}>
    {
      chosenRestaraunt ?
        <Chats /> :
        <MatchFinder setChosenRestaraunt={(restaraunt) => {
          setChosenRestaraunt(restaraunt);
        }}
        />
    }
  </div>
}

const mapStateToProps = function () {
  return {};
};

export default connect(mapStateToProps)(App);
