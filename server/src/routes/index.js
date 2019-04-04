const express = require('express');
const bodyParser = require('body-parser');
const tenBis = require('../10bis');

const app = express();
app.use(bodyParser.json());

const groups = [
  {
    _id: '1234',
    users: [
      {
        displayName: 'Michael Vaisberg',
        age: 30,
        company: 'Soluto',
        role: 'Developer'
      },
      {
        displayName: 'Yair Simanovic',
        age: 28,
        company: 'Facebook',
        role: 'Developer'
      },
      {
        displayName: 'Itay Ben-Zvi',
        age: 33,
        company: 'Freelance',
        role: 'Designer'
      }
    ]
  }
];

// const restaurants = [
//   {
//     name: 'McDonalds',
//     logo: 'www.google.com',
//     description: 'come here and eat cheap burgers!',
//     thumbnail: '',
//     location: {
//       lon: 36,
//       lat: 36
//     },
//     groups
//   }
// ];

app.get('/restaurants', async (req, res) => {
  let restaraunts = tenBis.getRestaurantsByAddress('Rotcshild 39, Tel Aviv');
  res.send(restaraunts);
});

module.exports = app;
