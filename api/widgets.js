const express = require('express');
const {authHandler} = require('../middleware/authHandler')
const app = express.Router()

app.post('/v1/create', authHandler, async (req, res, next) => {
  try {
    
  } catch (error) {
    next(error)
  }
})

module.exports = app