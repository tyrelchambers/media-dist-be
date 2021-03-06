require("dotenv").config();
const cors = require("cors");
const express = require("express");
const port = process.env.PORT || "4000";
const app = express();
const auth = require("./api/auth");
const integrations =require('./api/integrations')
const user = require('./api/user')
const youtube = require('./api/youtube')

app.use(cors());

app.use(express.json());

app.use("/api/auth", auth);
app.use('/api/integrations', integrations)
app.use('/api/user', user)
app.use('/api/youtube', youtube)

app.use(function (err, req, res, next) {
  console.error(err.message);
  res.status(500).send(err.message);
});

app.listen(port, () => console.log("App running on " + port));
