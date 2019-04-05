const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const tenBis = require('../10bis');
const groups = require('../../data/groups.json');
const fs = require('fs-extra');
const uuid = require('uuid');
const googleTranslate = require('google-translate')('AIzaSyA6IGLLvINaRZfvCig0Z2DwzOqX8q9SN4Y');

let restaraunts;
tenBis
  .getRestaurantsByAddress('Rotcshild 39, Tel Aviv')
  .then((tenBidRestaraunts) => {
    restaraunts = tenBidRestaraunts.map(_ => {
      return {
        _id: uuid(),
        name: _.RestaurantName,
        logo: _.RestaurantLogoUrl,
        thumbnail: _.RestaurantLogoUrl,
        address: _.RestaurantAddress,
        tags: _.RestaurantCuisineList.split(",").map(tag => tag.trim()),
        rating: _.ReviewsRank,
        location: {
          lon: _.ResGeoLocation_lon,
          lat: _.ResGeoLocation_lat
        }
      }
    });

    return Promise.resolve(restaraunts);
  })
  .then((tenBidRestaraunts) => {
    tenBidRestaraunts.forEach(_ => {
      googleTranslate.translate(_.name, 'en', function (err, translation) {
        if (err) {
          console.error(err);
          return;
        }

        _.name = translation.translatedText;
      });

      googleTranslate.translate(_.address, 'en', function (err, translation) {
        if (err) {
          console.error(err);
          return;
        }

        _.address = translation.translatedText;
      });

      googleTranslate.translate(_.tags.join(","), 'en', function (err, translation) {
        if (err) {
          console.error(err);
          return;
        }
        _.tags = translation.translatedText.split(",").map(tag => tag.trim()).filter(tag => !!tag);
      });
    });
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

const BASE_THUMBNAIL_URL = `https://randomuser.me/api/portraits/men/****.jpg`;
index = 1;

app.get('/restaurants', async (req, res) => {
  let filtered = restaraunts.filter(_ => _.address !== 'Location');
  filtered.forEach(_ => {
    _.groups = groups.filter(__ => __.restarauntName === _.name);
    if (_.groups.length <= 0) {
      _.groups.push({
        "_id": "631f571a-67d3-458c-8ae6-deaa29fce12a",
        "members": [
          {
            "name": uuid(),
            "thumbnail": BASE_THUMBNAIL_URL.replace("****", index)
          },
          {
            "name": uuid(),
            "thumbnail": BASE_THUMBNAIL_URL.replace("****", index)
          },
          {
            "name": uuid(),
            "thumbnail": BASE_THUMBNAIL_URL.replace("****", index)
          }
        ],
        "restarauntName": _.name
      })
    }
  });

  res.send(filtered);
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
  groups.push({
    _id: newGroupId, members: req.body.map(_ => {
      _.thumbnail = BASE_THUMBNAIL_URL.replace("****", ++index);
      return _;
    }), restarauntName: req.params.name
  });
  await fs.writeFile('./data/groups.json', JSON.stringify(groups));
  res.send(newGroupId);
});

app.post('/restaurants/:name/groups/:_id/user', async (req, res) => {
  const group = groups.filter(group => group._id === req.params._id && group.restaurantName === req.params.name)[0];
  group.members.push(req.body);
  await fs.writeFile('./data/groups.json', JSON.stringify(groups));
  res.send(200);
});

module.exports = app;
