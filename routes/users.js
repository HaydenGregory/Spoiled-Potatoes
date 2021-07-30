var express = require("express");
// using bcrypt here to hash password
const bcrypt = require("bcrypt");
// ../ because we're in the routes folder and we need to go up a folder ot go to the models folder
const db = require("../models");
const { route } = require(".");
const { render } = require("../app");
var router = express.Router();

// registering a user
router.post("/register", function (req, res, next) {
  // check if email and password have data entered
  // if not(no) body or email or password respond with an error
  if (!req.body || !req.body.email || !req.body.password) {
    res.status(422).json({ error: "must enter email and password" });
    return;
  }
  // hash password
  bcrypt
    .hash(req.body.password, 10)
    // .then is a function that takes the hash we just created
    .then((hash) => {
      // store user details
      db.User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      })
        // then takes that user just created and passes it to the function
        .then((user) => {
          req.session.user = user
          // respond with success
          res.status(201).redirect('/dashboard');
        });
    });
});

// still sending info so doing another post
// POST users/login
router.post("/login", (req, res) => {
  // what info do we need to log the user in?
  if (!req.body || !req.body.email || !req.body.password) {
    res.status(422).json({ error: "must enter email and password" });
    return;
  }

  // find user, pass object into ()
  db.User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    // check password (check what pw the user input against stored password)
    bcrypt.compare(req.body.password, user.password).then((success) => {
      if (success) {
        // log in user
        // setting new property (of user) on this session object 
        // read as: if there is a user on the session (read from right to left)
        req.session.user = user;
        res.redirect('/dashboard');
      } else {
        // if incorrect, 401 (unauthorized)
        res.status(401).json({ error: "incorrect password" });
      }
    });
  });
});

// GET /user/options
router.get('/options', (req, res, next) => {
  res.render('user-options', {
    title: "Spoiled Potatoes"
  })
})

// get bc we arent sending info, just making request
router.get('/logout', (req, res) => {
  // tell express that user logged out
  // remove user information from the session by setting user = null
  req.session.user = null;
  // send response to show successful logout
  res.json({ message: 'successfully logged out' })
})

module.exports = router;