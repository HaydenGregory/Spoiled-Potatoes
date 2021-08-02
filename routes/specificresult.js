var express = require('express');
var router = express.Router();
const db = require("../models");

/* GET specific result page. */
router.get('/results/:movieid', function (req, res, next) {
  res.render('specificresult', { title: 'Spoiled Potatoes', messages: req.flash() });
});

module.exports = router;
