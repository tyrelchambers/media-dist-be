const express = require('express');
const { google } = require('googleapis');
const authHandler = require('../middleware/authHandler');
const db = require('../models/index')
const app =express.Router()
const queryString = require('query-string')


const scopes = [
  'https://www.googleapis.com/auth/youtube.upload',
  
];


app.get('/v1/youtube', authHandler, async (req, res, next) => {
  try {

    const oauth2Client = new google.auth.OAuth2(
      process.env.YOUTUBE_CLIENT_ID,
      process.env.YOUTUBE_CLIENT_SECRET,
      "http://localhost:3000/callback/youtube"
    );

    const url = oauth2Client.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
        access_type: 'offline',

      // If you only need one scope you can pass it as a string
      scope: scopes
    });

    res.send(url)
  } catch (error) {
    next(error)
  }
})

app.get('/v1/youtube/access_token', authHandler, async (req, res, next) => {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.YOUTUBE_CLIENT_ID,
      process.env.YOUTUBE_CLIENT_SECRET,
      "http://localhost:3000/callback/youtube"
    );

    const {access_token} = req.query;
    const {tokens } = await oauth2Client.getToken(access_token)
    oauth2Client.setCredentials(tokens);
    
    await db.User.update({
      youtubeAccessToken: oauth2Client.credentials.access_token,
      youtubeRefreshToken: oauth2Client.credentials.refresh_token

    }, {
      where: {
        uuid: res.locals.userId
      }
    })

    res.send({message: "success"})
  } catch (error) {
    next(error)
  }
})

app.put('/v1/youtube/disconnect', authHandler, async(req, res, next) => {
  try {
    await db.User.update({
      youtubeRefreshToken: '',
      youtubeAccessToken: ""
    }, {
      where: {
        uuid: res.locals.userId
      }
    })

    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

app.get('/v1/facebook/login', authHandler, async (req, res, next) => {
  try {
    const stringifiedParams = queryString.stringify({
      client_id: process.env.APP_ID_GOES_HERE,
      redirect_uri: 'https://www.example.com/authenticate/facebook/',
      scope: ['email', 'user_friends'].join(','), // comma seperated string
      response_type: 'code',
      auth_type: 'rerequest',
      display: 'popup',
    });
    const facebookLoginUrl = `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;

  } catch (error) {
    next(error)
  }
})

module.exports = app