import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

import { chooseGroup,setRestaraunts } from './actions'

const containerStyle = {
  height: '100%',
  width: '100%',
};

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  chat: {
    margin: '20px',
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: '15px',
    borderWidth: '3px',
  }
};

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      open: true,
      response: false,
      endpoint: "http://localhost:3001"
    };
  }

  componentWillMount() {
    axios.get('http://localhost:3001/restaurants')
    .then((result) => {
      this.props.dispatch(setRestaraunts(result.data))
    })
  }
  chooseGroup = (groupId) => this.props.dispatch(chooseGroup(groupId))

  render() {
    const { restaraunts } = this.props;
    let groupsList = null;

    if (restaraunts) {
      const filteredRests = Object.keys(restaraunts).filter((restKey) => restaraunts[restKey].groups && restaraunts[restKey].groups[0]).map((key) => restaraunts[key])
      groupsList = filteredRests.map((rest) => {
        const lastMessage = (restaraunts[rest.name].groups[0] && restaraunts[rest.name].groups[0].messages) ? restaraunts[rest.name].groups[0].messages[restaraunts[rest.name].groups[0].messages.length - 1] : ''
        return <div key={rest.name}>
          <ListItem
            style={styles.chat}
            onClick={() => this.chooseGroup(rest.name)}
          >
            <p>{rest.name} </p>
            <p>{lastMessage}</p>
          </ListItem>
          <Divider />
        </div>
      });
    }

    return (
      <Paper style={containerStyle} zDepth={4} >
        <AppBar style={{ textAlign: "center" }} showMenuIconButton={true} title="React Chat" />
        <div style={{ overflow: "auto" }} ref={elem => this.chatWindow = elem}>
          <List style={{ height: "350px" }}>
            <Subheader>Groups:</Subheader>
            {groupsList}
          </List>
        </div>
      </Paper>
    );
  }
}

const mapStateToProps = function (state, props) {
  return {
    restaraunts: state.restaraunts,
  };
};

export default connect(mapStateToProps)(Chat);
