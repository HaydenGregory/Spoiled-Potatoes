const express = require('express')
const router = express.Router()
const db = require('../models')
const fetch = require('node-fetch')

router.post('/', (req, res) => {

  const userInput = req.body.userInput
  const urlEncodedSearchString = encodeURIComponent(userInput)
  fetch(`https://www.omdbapi.com/?apikey=59354c85&s=${urlEncodedSearchString}`)
    .then(res => res.json())
    .then(results => {
      res.render('results', {
        results: results.Search,
        title: "Spoiled Potatoes",
        messages: req.flash()
      })
    })
})

module.exports = router
