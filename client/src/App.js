import React, { Component } from 'react';
import { connect } from 'react-redux';

import MatchFinder from './MatchFinder'

class App extends Component {
  render() {
    return (
      //   <Chat/>
      <MatchFinder restaraunts={[{
        "name": "McDonalds",
        "description": "This is shit",
        "logo": "https://www.google.co.il/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
        "location": { "lon": 36, "lat": 36 },
        "groups": [[{
          "_id": "1234", "users": [
            { "displayName": "Michael Vaisberg", "age": 30, "company": "Soluto", "role": "Developer" },
            { "displayName": "Yair Simanovic", "age": 28, "company": "Facebook", "role": "Developer" },
            { "displayName": "Itay Ben-Zvi", "age": 33, "company": "Freelance", "role": "Designer" }
          ]
        }]]
      }]}
        setChosenRestaraunt={() => { }} />
    );
  }
}

const mapStateToProps = function (state) {
  return {};
};

export default connect(mapStateToProps)(App);
