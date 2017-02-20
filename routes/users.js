const express        = require("express");
const router         = express.Router();
// User model
const User           = require("../models/user");
// Bcrypt to encrypt passwords
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;
const ensureLogin = require("connect-ensure-login");
const passport      = require("passport");

router.get("/search-offer", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("users/search-offer", { user: req.user });
});

router.get("/signup", (req, res, next) => {
  res.render("users/signup");
});

router.get("/login", (req, res, next) => {
  res.render("users/login");
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/search-offer",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.post("/signup", (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  if (username === "" || password === "") {
    res.render("users/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("users/signup", { message: "The username already exists" });
      return;
    }

    var salt     = bcrypt.genSaltSync(bcryptSalt);
    var hashPass = bcrypt.hashSync(password, salt);

    var newUser = User({
      username,
      password: hashPass
    });

    newUser.save((err) => {
      console.log(err);
      if (err) {
        res.render("users/signup", { message: "The username already exists" });
      } else {
        res.redirect("/login");
      }
    });
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

module.exports = router;
