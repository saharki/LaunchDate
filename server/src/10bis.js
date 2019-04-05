let request = require('request');
let GeoCoder = require('node-geocoder');

let options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: 'AIzaSyB2GPTAJlxtEoimGgrpCX5ygKBTs8tDbhY',
  formatter: null
};

let geocoder = GeoCoder(options)
let Promise = require('promise');
let baseUrl = 'https://www.10bis.co.il/Restaurants/';

function apiRequest(url) {
  return new Promise(function (resolve, reject) {
    request.get(baseUrl + url, function (err, res) {
      if (err) reject(err);
      else resolve(JSON.parse(res.body));
    });
  });
}

let TenBis = function () { };

TenBis.prototype.getRestaurantsByCoordinates = function (lat, lon, maxDistance) {

  let url = 'SearchRestaurantsListByMapBoundaries?destinationLng=' + lon + '&destinationLat=' + lat + '&notrhBoundary=333.09966358838387&southBoundary=32.09330130083669&westBoundary=34.769518607379155&eastBoundary=34.777028792620854&isKosher=false&cuisineType=&FilterByCoupon=false&mapBoundsExtension=0.009';
  return apiRequest(url)
    .then(function (res) {
      return res.map(function (restaurant) { return restaurant; });
    }, function (err) {
      console.log('err', err);
    });
};
TenBis.prototype.getRestaurantsByAddress = function (address) {
  let getRestaurants = function (results) {
    let result = results[0] || results;
    if (result) {
      return this.getRestaurantsByCoordinates(result.latitude, result.longitude);
    }
  }.bind(this);

  return geocoder.geocode(address)
    .then(getRestaurants);
};

module.exports = new TenBis();