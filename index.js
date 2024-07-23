const express = require("express");
const passport = require("passport");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routerUser = require("./router-users.js");
const routerMovies = require("./router-movies");
const auth = require("./auth");

const app = express();

// Logging Middleware
const myLogger = (req, res, next) => {
  console.log(req.url);
  next();
};

const requestTime = (req, res, next) => {
  req.requestTime = Date.now();
  next();
};

// Middleware
app.use(cors({ origin: "*", credentials: true}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

// Initialzie authentication middleware
auth(app);

// Use middleware
app.use(myLogger);
app.use(requestTime);

// Use routers
app.use("/users", routerUser);
app.use("/movies", routerMovies);

// mongoose.connect("mongodb://localhost:27017/moviesdb", {
// useNewUrlParser: true,
// useUnifiedTopology: true,
// });
mongoose.connect(process.env.CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// Default text response
app.get("/", (req, res) => {
  res.send("Welcome to MoviesDB!");
});

// Default text response
app.get("/docs", (req, res) => {
  res.redirect("/documentation.html");
});

app.use(express.static("public"));

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke! " + err.message);
});

// Listen on port
const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
  console.log(`Listening on Port ${port}`);
});
