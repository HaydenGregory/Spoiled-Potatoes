var express = require('express');
var router = express.Router();
const db = require("../models");

/* GET specific result page. */
router.get('/results/:movieid', function (req, res, next) {
  res.render('specificresult', {
    title: 'Spoiled Potatoes',
    messages: req.flash()
  });
});

router.post('/fav/:movieId', (req, res, next) => {
  db.Favorite.findOne({
    where: {
      UserId: req.session.user.id,
      movieId: req.params.movieId
    }
  })
    .then((movie) => {
      if (movie) {
        res.json('Not added. Already Exists')
        return
      }
      db.Favorite.create({
        UserId: req.session.user.id,
        movieId: req.params.movieId
      })
        .then((favorite) => {
          console.log(favorite)
          res.send({ message: "WHAT UP" })
        })
    })
})



module.exports = router;