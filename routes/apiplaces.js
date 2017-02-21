var express = require('express');
var router = express.Router();
const Place = require('../models/search');

router.get('/api/places',(req, res, next) => {
  Place.find((error, places) => {
    if (error) { next(error); }
    else {
      res.json(places);
    }
  })
})

//CODE FOR GOOGLE API

router.post('/new',(req, res, next) => {
  // Get Params from POST
  let location = {
    type: 'Point',
    coordinates: [req.body.longitude, req.body.latitude]
  };

  // Create a new place with location
    const newPlace = Place({
      username: req.body.username,
      location: location
    });

  // Save the place to the Database
  newPlace.save((error) => {
    if (error) { console.log(error) }
    else {
      res.redirect('/');
    }
  })
});

module.exports = router;