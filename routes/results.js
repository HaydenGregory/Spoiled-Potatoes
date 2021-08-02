var express = require('express');
var router = express.Router();
const db = require("../models");

// /* GET results page
router.get('/', function (req, res, next) {
  res.render('results', { title: 'Spoiled Potatoes', messages: req.flash() });
});

module.exports = router;
