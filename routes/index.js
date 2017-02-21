var express = require('express');
var router = express.Router();
const User = require('../models/user');

router.get('/api', function(req, res, next){
  User.find((err, users) => {
    if (err) { next(err); }
    else {
      res.json(users);
    }
  })
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'foodExchange' });
});

router.get('/search', function(req, res, next) {
  res.render('users/search');
});

router.get('/offer', function(req, res, next) {
  res.render('users/offer');
});

// //CODE FOR GOOGLE API
//
// router.post('/new',(req, res, next) => {
//   // Get Params from POST
//   let location = {
//     type: 'Point',
//     coordinates: [req.body.longitude, req.body.latitude]
//   };
//
//   // Create a new place with location
//     const newPlace = Place({
//       name:        req.body.name,
//       description: req.body.description,
//       location:    location
//     });
//
//   // Save the place to the Database
//   newPlace.save((error) => {
//     if (error) { console.log(error) }
//     else {
//       res.redirect('/');
//     }
//   })
// });

module.exports = router;
