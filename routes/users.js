const express        = require("express");
const router         = express.Router();
// User model
const User           = require("../models/user");
// Bcrypt to encrypt passwords
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
    flat:req.body.flat,
    door: req.body.door,
    postal_code: req.body.postal_code,
    city: req.body.city
  }

      var salt     = bcrypt.genSaltSync(bcryptSalt);
      var hashPass = bcrypt.hashSync(app.locals.password, salt);
      console.log(hashPass);

      var newUser = User({
        username: app.locals.username,
        password: hashPass,
        address
      });

      newUser.save((err) => {
        console.log(err);
        if (err) {
          res.render("users/address", { message: "It´s necessary" });
        } else {
          res.redirect("/search-offer");
        }
      });

});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

module.exports = router;
