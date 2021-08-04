var express = require('express');
var router = express.Router();
const db = require("../models");
const fetch = require("node-fetch");

let movie = null;

/* GET specific result page. */
router.get('/:movieid', function (req, res, next) {
  // fetch movie ID from the API
  fetch(`http://www.omdbapi.com/?apikey=59354c85&i=${req.params.movieid}&plot=full`)
  .then(res => res.json())
  .then(results => {
    movie = results;
    // console.log(movie);
    // console.log("movie", this.movie);
    res.render('specificresult', {
      title: 'Spoiled Potatoes',
      messages: req.flash(),
      movie: results
    });
  })
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
          res.send({ message: "Added Successfully " })
        })
    })
})

router.post('/create/', (req, res) => {
  console.log('movie', movie)
  db.Review.create({
    UserId: req.session.user.id,
    movieId: movie.imdbID,
    rating: req.body.rate, 
    review: req.body.review
  }) .then((review) => {
    res.json(review)
  })
})

module.exports = router;