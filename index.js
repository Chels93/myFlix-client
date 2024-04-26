const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const Models = require("./models.js");
const cors = require("cors");
const auth = require("./auth")
const routerUser = require("./router-users.js")

const app = express();
app.use(cors());

// Express routers
auth(app);
routerUser(app)

mongoose.connect("mongodb://localhost:27017/moviesdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Log requests to server (Morgan Middleware)
let myLogger = (req, res, next) => {
  console.log(req.url);
  next();
};

let requestTime = (req, res, next) => {
  req.requestTime = Date.now();
  next();
};

app.use(myLogger);
app.use(requestTime);

// Default text response
app.get("/", (req, res) => {
  res.send("Welcome to MoviesDB!");
});

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke! " + err.message);
});

// Listen on port
app.listen(8080, () => console.log("Your app is listening on Port 8080."));
