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

router.get('/:id/delete', (req, res, next) => {
  const id = req.params.id;
  Food.findByIdAndRemove(id, (err, food) => {
    if (err){ return next(err); }
    return res.redirect('/search-offer');
  });
});

module.exports = router;
