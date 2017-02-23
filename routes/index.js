var express = require('express');
var router = express.Router();
const User = require('../models/user');
const Food = require('../models/food');

router.get('/api', function(req, res, next){
  User.find((err, users) => {
    if (err) { next(err); }
    else {
      res.json(users);
    }
  })
});

router.get('/foods', function(req, res, next){
  Food.find((err, foods) => {
    if (err) { next(err); }
    else {
      res.json(foods);
    }
  })
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'foodExchange' });
});


router.get('/offer', function(req, res, next) {
  Food.find((error, foods) => {
    if (error) {
      next(error);
    } else {
      res.render('users/offer', { foods });
    }
  });
});

router.get('/search', function(req, res, next) {
  Food.find((error, foods) => {
    if (error) {
      next(error);
    } else {
      res.render('users/search', { foods });
    }
  });
});


// food
// router.post("/foods", (req, res, next) => {
//
//   var foods = {
//     street: req.body.street,
//     number: req.body.houseNumber,
//     postal_code: req.body.postal_code,
//     city: req.body.city
//   };
//
//   var location = {
//    type: 'Point',
//    coordinates: [req.body.longitude, req.body.latitude]
//  };
//
//  console.log("this are the params: ", req.body)
//
//
//       var newFoods = Foods({
//         username: app.locals.username,
//         password: app.locals.password,
//         location: location,
//         address
//       });
//
//       newFood.save((err) => {
//         // console.log(err);
//         if (err) {
//           res.render("users/foods", { message: "It´s necessary" });
//         } else {
//           req.body.username = app.locals.username;
//           req.body.password = app.locals.password;
//           passport.authenticate("local")(req, res, function(){
//             res.redirect("/search-offer");
//           })
//         }
//     });
// });

module.exports = router;
