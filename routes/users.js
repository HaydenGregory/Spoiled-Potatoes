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
    req.flash('error', 'No Email or Password');
    res.redirect('/users/options')
    return;
  }
  db.User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user) {
        req.flash('error', 'Email already in use.')
        res.redirect('/users/options');
        return
      }
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
              req.flash('success', 'Successfully Logged In')
              res.redirect('/dashboard');
            });
        });
    })
  // hash password
});

// still sending info so doing another post
// POST users/login
router.post("/login", (req, res) => {
  // what info do we need to log the user in?
  if (!req.body || !req.body.email || !req.body.password) {
    req.flash('error', 'Please include email and password.')
    res.redirect('/users/options');
    return;
  }

  // find user, pass object into ()
  db.User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (!user) {
      req.flash('error', 'User not found.')
      res.redirect('/users/options');
      return
    }
    // check password (check what pw the user input against stored password)
    bcrypt.compare(req.body.password, user.password).then((success) => {
      if (success) {
        // log in user
        // setting new property (of user) on this session object 
        // read as: if there is a user on the session (read from right to left)
        req.session.user = user;
        req.flash('success', 'Successfully Logged In')
        res.redirect('/dashboard');
      } else {
        // if incorrect, 401 (unauthorized)
        req.flash('error', 'Incorrect password.')
        res.redirect('/users/options');
      }
    });
  });
});

// GET /user/options
router.get('/options', (req, res, next) => {
  res.render('user-options', {
    title: "Spoiled Potatoes",
    // messages: req.flash()
  })
})

// get bc we arent sending info, just making request
router.get('/logout', (req, res) => {
  // tell express that user logged out
  // remove user information from the session by setting user = null
  req.session.user = null;
  // send response to show successful logout
  req.flash('success', 'Successfully Logged Out')
  res.redirect('/users/options')
})

module.exports = router;