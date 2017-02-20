var express = require('express');
var router = express.Router();
const Place = require('../models/search');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'foodExchange' });
});

router.get('/api/places',(req, res, next) => {
  Place.find((error, places) => {
    if (error) { next(error); }
    else {
      res.json(places);
    }
  })
})



router.post('/new',(req, res, next) => {
  // Get Params from POST
  let location = {
    type: 'Point',
    coordinates: [req.body.longitude, req.body.latitude]
  };

  // Create a new Restaurant with location
    const newPlace = Place({
      name:        req.body.name,
      description: req.body.description,
      location:    location
    });

  // Save the restaurant to the Database
  newPlace.save((error) => {
    if (error) { console.log(error) }
    else {
      res.redirect('/');
    }
  })
});

module.exports = router;
