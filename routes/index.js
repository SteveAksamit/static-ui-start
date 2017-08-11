const express = require("express");
const router = express.Router();
const { Activity, Place, Restaurant, Hotel } = require("../db/models");

router.get('/', (req, res, next) => {
  let outerScopeContainer = {};
  Hotel.findAll()
  .then(function (dbHotels) {
    outerScopeContainer.dbHotels = dbHotels;
    return Restaurant.findAll();
  })
  .then(function (dbRestaurants) {
    outerScopeContainer.dbRestaurants = dbRestaurants;
    return Activity.findAll();
  })
  .then(function (dbActivities) {
    console.log()
    res.render('index', {
      Hotels: outerScopeContainer.dbHotels,
      Restaurants: outerScopeContainer.dbRestaurants,
      Activities: dbActivities
    });
  })
  .catch(next);
});

module.exports = router;
