const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const tenBis = require('../10bis');
const restaurants = require('../../data/restaurants.json');
const fs = require('fs-extra');
const uuid = require('uuid');

const app = express();
app.use(cors());
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

const restaurants = [
  {
    name: 'McDonalds',
    logo: 'www.google.com',
    description: 'come here and eat cheap burgers!',
    thumbnail: '',
    location: {
      lon: 36,
      lat: 36
    },
    groups
  }
];

const defaultUser = {
  displayName: 'User',
  age: 30,
  gender: 'male',
  company: 'Soluto',
  role: 'Developer'
}

app.get('/restaurants', async (req, res) => {
  let restaraunts = tenBis.getRestaurantsByAddress('Rotcshild 39, Tel Aviv');
  res.send(restaraunts);
});

app.post('/users', async (req, res) => {
  const usersFile = await fs.readFile('./data/users.json');  
  const users = JSON.parse(usersFile);
  const user = { ...defaultUser, ...req.body }
  users.push(user);
  await fs.writeFile('./data/users.json', JSON.stringify(users));
  res.send(200);
});

app.get('/users', async (req, res) => {
  const usersFile = await fs.readFile('./data/users.json');  
  const users = JSON.parse(usersFile);
  res.send(users);
});

app.post('/restaurants/:name/groups', async (req, res) => {
  const restaurant = restaurants.filter(restaurant => restaurant.name === req.params.name)[0];
  const newGroupId = uuid.v4();
  restaurant.groups.push({ _id: newGroupId, members: req.body });
  await fs.writeFile('./data/restaurants.json', JSON.stringify(restaurants));
  res.send(newGroupId);
});

app.post('/restaurants/:name/groups/:_id/user', async (req, res) => {
  const restaurant = restaurants.filter(restaurant => restaurant.name === req.params.name)[0];
  const group = restaurant.groups.filter(group => group._id === req.params._id)[0];
  group.members.push(req.body);
  await fs.writeFile('./data/restaurants.json', JSON.stringify(restaurants));
  res.send(200);
});

module.exports = app;
