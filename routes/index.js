var express = require('express');
var router = express.Router();
const Place = require('../models/search');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'foodExchange' });
});

//CODE FOR GOOGLE API

router.post('/new',(req, res, next) => {
  // Get Params from POST
  let location = {
    type: 'Point',
    coordinates: [req.body.longitude, req.body.latitude]
  };

  // Create a new place with location
    const newPlace = Place({
      name:        req.body.name,
      description: req.body.description,
      location:    location
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
