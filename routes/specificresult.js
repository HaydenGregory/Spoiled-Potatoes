var express = require('express');
var router = express.Router();
const db = require("../models");

/* GET specific result page. */
router.get('/results/:movieid', function (req, res, next) {
  res.render('specificresult', { title: 'Spoiled Potatoes', messages: req.flash() });
//   db.Favorite.findAll()
//     .then((movies) => {
//       res.json(movies)
//     })
});

router.post('/fav/:movieId', (req, res, next) => {
  db.Favorite.findOne({ where: {movieId: req.params.movieId} })
    .then((movie) => {
      if (movie) {
        req.flash('error', 'Movie Already in Favorites.')
        res.json('Not added. Already Exists')
        return
      }
      db.Favorite.create({
        UserId: req.session.user.id,
        movieId: req.params.movieId,
        rating: 4
      })
        .then(() => {
          req.flash('success', "Movie Added Successfully.")
          res.json('Created')
        })
    })
})



module.exports = router;