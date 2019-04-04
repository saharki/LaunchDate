import React, { useState, useEffect } from 'react';
import Chat from './Chat'
import MatchFinder from './MatchFinder'

const App = (props) => {
  const [chosenRestaraunt, setChosenRestaraunt] = useState(null);

  useEffect(() => {
    const action = chooseGroup(chosenRestaraunt.groups[0]._id);
    props.dispatch(action);
  }, []);

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
