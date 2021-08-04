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
      res.render('specificresult', {
        title: 'Spoiled Potatoes',
        messages: req.flash(),
        movie: results,
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

router.post('/create/', async (req, res) => {
  const foundReview = await db.Review.findOne({ where: { UserId: req.session.user.id, movieId: movie.imdbID } })
  if (!foundReview) {
    db.Review.create({
      UserId: req.session.user.id,
      movieId: movie.imdbID,
      rating: req.body.rate,
      review: req.body.review
    }).then((review) => {
      req.flash('success', 'Successfully added your review!')
      res.redirect('back')
    })
  } else {
    req.flash('error', 'You have already reviewed this movie. Try editing your review. You spoiled potato.')
    res.redirect('back')
  }
})

router.patch('/review/update', (req, res) => {
  db.Review.findOne({ where: { UserId: req.session.user.id, movieId: req.body.movieId } })
    .then((reviewToUpdate) => {
      console.log(reviewToUpdate)
      reviewToUpdate.update({
        review: req.body.review
      }).then((updatedReview) => {
        req.flash('success', 'Successfully updated your review. You spoiled potato.')
        res.redirect('back')
      })
    })
})

module.exports = router;