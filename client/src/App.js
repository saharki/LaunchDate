import React, { useState, useEffect } from 'react';
import Chats from './Chats';
import MatchFinder from './MatchFinder';
import { chooseGroup, addUserToGroup, createGroup } from './actions';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

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
  const [status, setStatus] = useState('pending');
  const [currentRestaraunts, setCurrentRestaraunts] = useState([]);
  const [chosenRestaraunt, setChosenRestaraunt] = useState(null);
  const { classes,dispatch, user } = props;

  useEffect(() => {
    axios.get('https://f2fd39cd.ngrok.io/restaurants')
      .then((result) => {
        setCurrentRestaraunts(result.data);
        setStatus('match');
      });
  }, []);


  useEffect(() => {
    if (chosenRestaraunt && chosenRestaraunt.groups && chosenRestaraunt.groups.length > 0) {
      const action = chooseGroup(chosenRestaraunt.name);
      props.dispatch(action);
    }
  });

  return <div style={containerStyle}>
    {
      status === 'pending' ?
        <CircularProgress className={classes.progress} /> :
        status === 'match' && currentRestaraunts.length > 0 ?
          <MatchFinder
            restaraunt={currentRestaraunts[0]}
            setChosenRestaraunt={async (restaraunt) => {
              setCurrentRestaraunts(currentRestaraunts.slice(1, currentRestaraunts.length - 1));
              setChosenRestaraunt(restaraunt);
              if(restaraunt.groups.length <= 0 ){
                await dispatch(createGroup(restaraunt._id, user))
              }
              else {
                await dispatch(addUserToGroup(restaraunt._id, restaraunt.groups[0]._id, user))
              }
              const result = await axios.get('https://f2fd39cd.ngrok.io/restaurants')
              setCurrentRestaraunts(result.data);
              setStatus('chat');
            }}
            removeRestaraunt={(restaraunt) => {
              setCurrentRestaraunts(currentRestaraunts.slice(1, currentRestaraunts.length - 1));
            }}
          /> :
          <Chats />
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
