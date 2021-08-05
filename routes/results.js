const express = require("express");
const router = express.Router();
const db = require("../models");
const fetch = require("node-fetch");

// /results route
router.post("/", (req, res) => {
  // take user input from search box and encode for url injection
  const userInput = req.body.userInput;
  const urlEncodedSearchString = encodeURIComponent(userInput);
  // fetch the movies based off the search from OMDB
  fetch(`https://www.omdbapi.com/?apikey=59354c85&s=${urlEncodedSearchString}`)
    .then((res) => res.json())
    .then((results) => {
      if (!results.Search) {
        req.flash("error", "No Results Found, Check Your Spelling");
        res.redirect("/", 302);
        return;
      } else if (!req.session.user) {
        res.render("results", {
          results: results.Search,
          title: "Spoiled Potatoes",
          messages: req.flash(),
          userActive: req.session.user,
        });
        return;
      } else {
        // search through Favorites table for the matching userid from session aka the cookie
        db.Favorite.findAll({
          where: {
            UserId: req.session.user.id,
          },
        })
          // pass results from the search into function
          .then((favs) => {
            // map through the results from the api search on line 11 to compare with user favorites
            const resultsWithFavs = results.Search.map((result) => {
              return {
                // (... duplicate entire object and store in new object)
                ...result,
                // adding another key value pair
                favorite: favs.find((fav) => {
                  // if fav movie matches the result save it as true otherwise save as false
                  return fav.movieId === result.imdbID;
                })
                  ? true
                  : false,
              };
            });
            res.render("results", {
              results: resultsWithFavs,
              title: "Spoiled Potatoes",
              messages: req.flash(),
              userActive: req.session.user,
            });
          });
      }
    });
});

router.delete("/delete/:movieId", (req, res) => {
  // use the id to delete the todo that matches
  db.Favorite.destroy({
    where: {
      UserId: req.session.user.id,
      movieId: req.params.movieId
    }
  })
  req.flash('success', 'Deleted a favorite')
  res.redirect(204, 'back')
})

module.exports = router;
