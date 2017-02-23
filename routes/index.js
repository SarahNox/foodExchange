var express = require('express');
var router = express.Router();
const User = require('../models/user');
const Food = require('../models/food');
const ensureLogin = require("connect-ensure-login");

router.get('/api', ensureLogin.ensureLoggedIn(), function(req, res, next){
  User.find((err, users) => {
    if (err) { next(err); }
    else {
      res.json(users);
    }
  })
});

router.get('/foods', ensureLogin.ensureLoggedIn(), function(req, res, next){
  Food.find((err, foods) => {
    if (err) { next(err); }
    else {
      res.json(foods);
    }
  })
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'WasapFood' });
});

router.get('/offer', ensureLogin.ensureLoggedIn(), function(req, res, next) {
  Food.find({isOffer: true}, (error, foods) => {
    if (error) {
      next(error);
    } else {
      res.render('users/offer', { foods });
    }
  });
});

router.get('/search', ensureLogin.ensureLoggedIn(), function(req, res, next) {
  Food.find({isOffer: false}, (error, foods) => {
    if (error) {
      next(error);
    } else {
      res.render('users/search', { foods });
    }
  });
});

router.get('/:id/delete', (req, res, next) => {
  console.log(req);
  const id = req.params.id;
  Food.findByIdAndRemove(id, (err, food) => {
    if (err){ return next(err); }
    return res.redirect(req.get("referer"));
  });
});

module.exports = router;


// router.get("/search-offer", ensureLogin.ensureLoggedIn(), (req, res) => {
//   res.render("users/search-offer", { user: req.user });
// });
