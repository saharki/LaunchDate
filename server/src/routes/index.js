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

const defaultUser = {
  displayName: 'User',
  age: 30,
  gender: 'male',
  company: 'Soluto',
  role: 'Developer'
}

app.get('/restaurants', async (req, res) => {
  let restaraunts1 = await tenBis.getRestaurantsByAddress('Rotcshild 39, Tel Aviv');
  res.send(restaraunts1.map(_ => {
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
      groups: [
        {
          "_id": uuid(),
          "members": [
            {
              "displayName": "Freddie",
              "gender": "male",
              "age": 35,
              "role": "developer",
              "company": "Soluto"
            },
            {
              "displayName": "Sahar",
              "gender": "male",
              "age": 22,
              "role": "Designer",
              "company": "Soluto"
            }
          ]
        }
      ]
    }
  }));
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
