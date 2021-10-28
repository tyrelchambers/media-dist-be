const express = require("express");
const signToken = require("../libs/signToken");
const db = require("../models");

const app = express.Router();

app.post("/v1/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await db.User.findOne({
      where: {
        email,
        password,
      },
    });

    const token = await signToken(user.uuid, "4w");

    res.send({ token });
  } catch (error) {
    next(error);
  }
});

module.exports = app;