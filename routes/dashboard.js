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
      res.render('dashboard', {
        title: 'Spoiled Potatoes',
        user,
        favorites: db.Favorite,
        reviews: db.Review,
        messages: req.flash()
      });
    })
});

router.patch('/update', (req, res) => {
  // Find the user id to update
  db.User.findOne({ where: { id: req.session.user.id } })
    .then(user => {
      user.update(
        {bio: req.body.bio}
      )
      .then((updatedBio) => {
        req.flash('success', 'Successfully updated bio. You are a true Spoiled Potato!')
        res.redirect('/', 200)
      })
    })
})

module.exports = router;
