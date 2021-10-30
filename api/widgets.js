const express = require('express');
const {authHandler} = require('../middleware/authHandler')
const app = express.Router()

app.post('/v1/create/youtube', authHandler, async (req, res, next) => {
  try {
    
  } catch (error) {
    next(error)
  }
})

module.exports = app

// type: youtube
// title:
// description
// tags
// visibility: default unlisted