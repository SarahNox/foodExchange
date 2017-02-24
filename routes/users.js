const express        = require("express");
const router         = express.Router();
const User           = require("../models/user");
const Food          = require("../models/food");
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;
const ensureLogin = require("connect-ensure-login");
const passport      = require("passport");
var app = express();


router.get("/search-offer", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("users/search-offer", { user: req.user });
});

router.get("/signup", (req, res, next) => {
  res.render("users/signup");
});

router.get("/login", (req, res, next) => {
  res.render("users/login");
});

router.get("/address", (req, res, next) => {
  res.render("users/address");
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/search-offer",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.post("/signup", (req, res, next) => {
  app.locals.username = req.body.username;
  app.locals.password = req.body.password;

  if (app.locals.username === "" || app.locals.password === "") {
    res.render("users/signup", { message: "Indicate username and password" });
    return;
  }
  User.findOne({username: app.locals.username}, "username", (err, user) => {
    if (user !== null) {
      res.render("users/signup", { message: "The username already exists" });
      return;
    } else {
      res.render("users/address")
    }
  });
});

router.post("/address", (req, res, next) => {

  var address = {
    street: req.body.street,
    number: req.body.houseNumber,
    postal_code: req.body.postal_code,
    city: req.body.city
  };

  var location = {
    type: 'Point',
    coordinates: [req.body.longitude, req.body.latitude]
  };

  console.log("this are the params: ", req.body)

  var salt     = bcrypt.genSaltSync(bcryptSalt);
  var hashPass = bcrypt.hashSync(app.locals.password, salt);


  var newUser = User({
    username: app.locals.username,
    password: hashPass,
    location: location,
    address
  });

  newUser.save((err) => {
    // console.log(err);
    if (err) {
      res.render("users/address", { message: "It´s necessary" });
    } else {
      req.body.username = app.locals.username;
      req.body.password = app.locals.password;
      passport.authenticate("local")(req, res, function(){
        res.redirect("/search-offer");
      })
    }
  });
});

router.post("/offer", (req, res, next) => {
  var foodName = req.body.foodName;

  var address = {
    street: req.body.street,
    number: req.body.houseNumber,
    postal_code: req.body.postal_code,
    city: req.body.city
  };

  var isOffer = req.body.isOffer;

  var location = {
    type: 'Point',
    coordinates: [req.body.longitude, req.body.latitude]
  };

  var newFood = Food({
    foodName: foodName,
    location: location,
    isOffer: isOffer,
    address
  });

  newFood.save((err) => {
    // console.log(err);
    if (err) {
      res.render("/offer", { message: "Dame argo paaayoooo!!" });
    } else {
      res.redirect("/offer")
    }})
  });

  router.post("/search", (req, res, next) => {
    var foodName = req.body.foodName;

    var address = {
      street: req.body.street,
      number: req.body.houseNumber,
      postal_code: req.body.postal_code,
      city: req.body.city
    };

    var isOffer = req.body.isOffer;

    var location = {
      type: 'Point',
      coordinates: [req.body.longitude, req.body.latitude]
    };

    var newFood = Food({
      foodName: foodName,
      location: location,
      isOffer: isOffer,
      address
    });

    newFood.save((err) => {
      if (err) {
        res.render("/search", { message: "Dame argo paaayoooo!!" });
      } else {
        res.redirect("/search")
      }})
    });


    router.get("/logout", (req, res) => {
      req.logout();
      res.redirect("/");
    });

module.exports = router;
