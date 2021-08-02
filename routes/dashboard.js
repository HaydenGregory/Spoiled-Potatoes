var express = require('express');
var router = express.Router();
const db = require("../models");

/* GET user dashboard */
router.get('/', function (req, res, next) {
  db.User.findOne({
    where: {
      id: req.session.user.id
    }
  })
    .then((user) => {
      res.render('dashboard', { title: 'Spoiled Potatoes', user, messages: req.flash() });
    })
});

module.exports = router;
