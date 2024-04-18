const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const Models = require('./models.js');

const app = express();
let auth = require('./auth')(app);
require('./passport');

const Movies = Models.Movie;
const Users = Models.User;


mongoose.connect('mongodb://localhost:27017/moviesdb', {
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
app.get('/', (req, res) => {
    res.send('Welcome to MoviesDB!');
});

// Returns a JSON object of all movies to the user
app.get('/movies', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Movies.find()
        .then((movies) => {
            res.status(201).json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
});

// Returns data (description, genre, director, image URL) about a single movie by title
app.get('/movies/:Title', passport.authenticate('jwt', { session: false }), async (req, res) => {
   await Movies.findOne({ Title: req.params.Title })
        .then((movie) => {
            res.json(movie);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
});

// Returns data about a genre by name/title
app.get('/movies/genre/:genreName', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Movies.findOne({ 'Genre.Name': req.params.genreName })
        .then((genre) => {
            if (!genre) {
                return res.status(404).send('Genre not found.');
            }
            res.status(200).json(genre);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// Returns data about a director (bio, birth year, death year) by name
app.get('/movies/director/:directorName', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Movies.findOne({ 'Director.Name': req.params.directorName })
        .then((director) => {
            if (!director) {
                return res.status(404).send('Director not found.');
            }
            res.status(200).json(director);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
    });


// Returns a JSON object of all users 
app.get('/users', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Users.find()
        .then(function (users) {
            res.status(200).json(users);
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});


// Allows new users to register
app.post('/users', (req, res) => {
    Users.findOne({ userName: req.body.userName })
        .then(user => {
            if (user) {
                return res.status(400).send(req.body.userName + 'already exists.');
            } else {
                Users.create({
                    userName: req.body.userName,
                    Password: req.body.Password, 
                    email: req.body.email,
                    birthdate: req.body.birthdate,
                })
                    .then(user => {
                        res.status(200).json(user);
                    })
                    .catch(error => {
                        console.error(error);
                        res.status(500).send('Error: ' + error);
                    });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Error: ' + error); 
        });
});
   
// Allows users to update their user info 
app.put('/users/:userName', passport.authenticate('jwt', { session: false}), async (req, res) => {
    await Users.findOneAndUpdate (
        { userName: req.params.userName },
        {
            $set: {
                userName: req.body.userName,
                Password: req.body.Password,
                email: req.body.email,
                birthdate: req.body.birthdate,
            },
        },
        { new: true },
    )
    .then(updatedUser => {
        res.json(updatedUser);
    })
    .catch(err => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// Allows users to add a movie to their list of favorites
app.post('/users/:userName/movies/:_id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Users.findOneAndUpdate({ userName: req.params.userName }, 
        { $push: { favoriteMovies: req.params._id } }
    )
    .then((updatedUser) => {
        res.status(200).json(updatedUser);
        })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
        });
});

// Allows users to remove a movie from their list of favorites
app.delete('/users/:userName/movies/:ObjectId', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Users.findOneAndUpdate({ userName: req.params.userName }, 
        { userName: req.params.userName },
        { $pull: { favoriteMovies: req.params.ObjectId } }, 
    )
    .then((updatedUser) => {
        res.status(200).json(updatedUser);
        })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
        });
});

// Allows existing users to deregister 
app.delete('/users/:userName', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Users.findOneAndDelete({ userName: req.params.userName })
        .then((user) => {
            if (!user) {
                res.status(400).send(req.params.userName + ' was not found.');
            } else {
                res.status(200).send(req.params.userName + ' was deleted.');
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke! ' + err.message);
});

// Listen on port
app.listen(8080, () => console.log('Your app is listening on Port 8080.'));
