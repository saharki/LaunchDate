import React, { useState, useEffect } from 'react';
import Chats from './Chats';
import MatchFinder from './MatchFinder';
import { chooseGroup } from './actions';
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
  const { classes } = props;

  useEffect(() => {
    axios.get('https://515fdb63.ngrok.io/restaurants')
      .then((result) => {
        setCurrentRestaraunts(result.data);
        setStatus('match');
      });
  }, []);


  useEffect(() => {
    if (chosenRestaraunt && chosenRestaraunt.groups && chosenRestaraunt.groups.length > 0) {
      const action = chooseGroup(chosenRestaraunt.groups[0]._id);
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
            setChosenRestaraunt={(restaraunt) => {
              setChosenRestaraunt(restaraunt);
            }}
            removeRestaraunt={(restaraunt) => {
              setCurrentRestaraunts(props.currentRestaraunts.slice(1, props.currentRestaraunts.length - 1));
            }}
          /> :
          <Chats />
    }
  </div>
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = function ({ chosenRestaraunt }) {
  return {};
};

export default withStyles(styles)(connect(mapStateToProps)(App));
