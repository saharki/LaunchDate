import React, { useState, useEffect } from 'react';
import Chats from './Chats';
import MatchFinder from './MatchFinder';
import { chooseGroup, addUserToGroup, createGroup, setRestaraunts } from './actions';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const containerStyle = {
  height: '812px',
  width: '375px',
  margin: 50,
  textAlign: 'left',
  display: 'inline-block',
  position: 'relative'
};

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

const App = (props) => {
  // const [status, setStatus] = useState('pending');
  // const [currentRestaraunts, setCurrentRestaraunts] = useState([]);
  // const [chosenRestaraunt, setChosenRestaraunt] = useState(null);
  // const { classes,dispatch, user } = props;

  // useEffect(() => {
  //   // axios.get('http://localhost:3001/restaurants')
  //   axios.get('http://localhost:3001/restaurants')
  //     .then((result) => {
  //       setCurrentRestaraunts(result.data);
  //       setRestaraunts(result.data)
  //       setStatus('match');
  //     });
  // }, []);


  // useEffect(() => {
  //   if (chosenRestaraunt && chosenRestaraunt.groups && chosenRestaraunt.groups.length > 0) {
  //     const action = chooseGroup(chosenRestaraunt.name);
  //     props.dispatch(action);
  //   }
  // });

  return <div style={containerStyle}>
    {
      // status === 'pending' ?
      //   <CircularProgress className={classes.progress} /> :
      //   status === 'match' && currentRestaraunts.length > 0 ?
      //     <MatchFinder
      //       restaraunt={currentRestaraunts[0]}
      //       setChosenRestaraunt={async (restaraunt) => {
      //         setCurrentRestaraunts(currentRestaraunts.slice(1, currentRestaraunts.length - 1));
      //         setChosenRestaraunt(restaraunt);
      //         if(restaraunt.groups.length <= 0 ){
      //           await createGroup(restaraunt.name, user)
      //         }
      //         else {
      //           await addUserToGroup(restaraunt.name, restaraunt.groups[0]._id, user)
      //         }
      //         const result = await axios.get('http://localhost:3001/restaurants')
      //         dispatch(setRestaraunts(result.data))
      //         setStatus('chat');
      //       }}
      //       removeRestaraunt={(restaraunt) => {
      //         setCurrentRestaraunts(currentRestaraunts.slice(1, currentRestaraunts.length - 1));
      //       }}
      //     /> :
      <Router>
        <Route path="/:id" component={Chats} />
      </Router>
    }
  </div>
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = function (state) {
  return {
    user: state.user,
  };
};

export default withStyles(styles)(connect(mapStateToProps)(App));
