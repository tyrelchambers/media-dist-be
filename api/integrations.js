const express = require('express');
const { google } = require('googleapis');
const authHandler = require('../middleware/authHandler');

const app =express.Router()

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_KEY
});

const params = {
  blogId: '3213900'
};

app.get('/v1/youtube', authHandler, async (req, res, next) => {
  try {
    
  } catch (error) {
    next(error)
  }
})

module.exports = app