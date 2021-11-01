const express = require('express');
const { google } = require('googleapis');
const authHandler = require('../middleware/authHandler');
const db = require('../models');

const app = express.Router()

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_KEY

})

app.post('/v1/upload', authHandler, async (req, res, next) => {
  try {
    const {title, description, visbility, tags, file} = req.body
    const user = await db.User.findOne({
      where: {
        uuid: res.locals.userId
      },
      attributes: ['youtubeRefreshToken']
    })

    console.log(file);

    // youtube.videos.insert({
    //   auth: user.youtubeRefreshToken,
    //   part: 'snippet,contentDetails,status',
    //   media: {

    //   },
    //   resource: {
    //     status: {
    //       privacyStatus: 'private'
    //     }
    //   }
    // });

    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

module.exports = app