const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const tenBis = require('../10bis');
const groups = require('../../data/groups.json');
const fs = require('fs-extra');
const uuid = require('uuid');

let restaraunts;
tenBis
  .getRestaurantsByAddress('Rotcshild 39, Tel Aviv')
  .then((tenBidRestaraunts) => {
    restaraunts = tenBidRestaraunts.map(_ => {
      return {
        name: _.RestaurantName,
        logo: _.RestaurantLogoUrl,
        thumbnail: _.RestaurantLogoUrl,
        address: _.RestaurantAddress,
        tags: _.RestaurantCuisineList.split(", "),
        rating: _.ReviewsRank,
        location: {
          lon: _.ResGeoLocation_lon,
          lat: _.ResGeoLocation_lat
        },
        groups: groups.filter(_ => _.restarauntName === _.RestaurantName)
      }
    })
  });

const app = express();
app.use(cors());
app.use(bodyParser.json());

const defaultUser = {
  displayName: 'User',
  age: 30,
  gender: 'male',
  company: 'Soluto',
  role: 'Developer'
}

app.get('/restaurants', async (req, res) => {
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
  const newGroupId = uuid.v4();
  groups.push({ _id: newGroupId, members: req.body, restarauntName: req.params.name });
  await fs.writeFile('./data/groups.json', JSON.stringify(groups));
  res.send(newGroupId);
});

app.post('/restaurants/:name/groups/:_id/user', async (req, res) => {
  const group = groups.filter(group => group._id === req.params._id && group.restarauntName === req.params.name)[0];
  group.members.push(req.body);
  await fs.writeFile('./data/groups.json', JSON.stringify(groups));
  res.send(200);
});

module.exports = app;
