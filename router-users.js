const express = require("express");
const passport = require("passport");
const Models = require("./models.js");
const { check, validationResult } = require("express-validator");
const cors = require("cors");

const router = express.Router();
const Users = Models.User;

  // Enable CORS for all routes or specify origins
  router.use(
    cors({
      origin: "*",
      credentials: true,
    })
  );

  router.use(express.json());

  // Returns a JSON object of all users
  router.get(
    "/users",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      await Users.find()
        .then(function (users) {
          res.status(200).json(users);
        })
        .catch(function (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        });
    }
  );

  // Allows new users to register
  router.post(
    "/users",
    [
      check("username", "Username is required").isLength({ min: 5 }),
      check(
        "username",
        "Username contains non alphanumeric characters - not allowed."
      ).isAlphanumeric(),
      check("password", "Password is required").not().isEmpty(),
      check("email", "Email does not appear to be valid").isEmail(),
    ],
    async (req, res) => {
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      if (!req.body.password || !req.body.username) {
        return res.status(400).json({ error: "username or password missing" });
      }

      let hashedPassword = Users.hashPassword(req.body.password);

      try {
        const existingUser = await Users.findOne({
          username: req.body.username,
        });
        if (existingUser) {
          return res.status(400).send(req.body.username + "already exists.");
        }

        const newUser = await Users.create({
          username: req.body.username,
          password: hashedPassword,
          email: req.body.email,
          birthdate: req.body.birthdate,
        });

        res.status(201).json(newUser);
      } catch (error) {
        console.error(error);
        res.status(500).send("Error: " + error);
      }
    }
  );

  // Allows users to update their user info
  router.put(
    "/users/:username",
    passport.authenticate("jwt", { session: false }),
    [
      check("username", "Username is required").isLength({ min: 5 }),
      check(
        "username",
        "Username contains non alpanumeric characters - not allowed."
      ).isAlphanumeric(),
      check("email", "Email does not appear to be valid").isEmail(),
      check("password", "Password must be between 8 and 20 characters")
        .optional()
        .isLength({ min: 8, max: 20 }),
    ],
    async (req, res) => {
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      let updateFields = {
        username: req.body.username,
        email: req.body.email,
        birthdate: req.body.birthdate,
      };

      if (req.body.password) {
        updateFields.password = Users.hashPassword(req.body.password);
      }

      try {
        const updatedUser = await Users.findOneAndUpdate(
          { username: req.params.username },
          updateFields,
          { new: true }
        );

        if (!updatedUser) {
          return res.status(404).send("User not found.");
        }

        res.status(200).json(updatedUser);
      } catch (error) {
        console.error(error);
        res.status(500).send("Error: " + error);
      }
    }
  );

// Get user info
router.get(
  "/users/:username",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = await Users.findOne({ username: req.params.username });
      if (!user) {
        return res.status(404).send("User not found.");
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error: " + error);
    }
  }
);

// Allows users to add a movie to their list of favorites
router.post(
  "/users/:username/movies/:movieId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Users.findOneAndUpdate(
      { username: req.params.username },
      { $addToSet: { favoriteMovies: req.params.movieId } },
      { new: true }
    )
      .then((updatedUser) => {
        res.status(200).json(updatedUser);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// Allows users to remove a movie from their list of favorites
router.delete(
  "/users/:username/movies/:movieId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Users.findOneAndUpdate(
      { username: req.params.username },
      { $pull: { favoriteMovies: req.params.movieId } },
      { new: true }
    )
      .then((updatedUser) => {
        if (!updatedUser) {
          return res.status(404).send("User not found.");
        }
        res.status(200).json(updatedUser);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// Allows existing users to deregister
router.delete(
  "/users/:username",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Users.findOneAndDelete({ username: req.params.username })
      .then((user) => {
        if (!user) {
          res.status(400).send(req.params.username + " was not found.");
        } else {
          res.status(200).send(req.params.username + " was deleted.");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

module.exports = router;
