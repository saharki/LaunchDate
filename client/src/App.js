import React, { useState, useEffect } from 'react';
import Chats from './Chats';
import MatchFinder from './MatchFinder';
import { chooseGroup } from './actions';
import { connect } from 'react-redux';

const containerStyle = {
  height: '812px',
  width: '375px',
  margin: 50,
  textAlign: 'left',
  display: 'inline-block',
  position: 'relative'
};

const App = (props) => {
  const [chosenRestaraunt, setChosenRestaraunt] = useState(null);

  useEffect(() => {
    if (chosenRestaraunt && chosenRestaraunt.groups && chosenRestaraunt.groups.length > 0) {
      const action = chooseGroup(chosenRestaraunt.groups[0]._id);
      props.dispatch(action);
    }
  });

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

const mapStateToProps = function ({ chosenRestaraunt }) {
  return {};
};

export default connect(mapStateToProps)(App);
