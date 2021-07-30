var express = require('express');
var router = express.Router();
const db = require("../models");

// /* GET results page
router.get('/results', function(req, res, next) {
  res.render('results', { title: 'Spoiled Potatoes' });
});

module.exports = router;
