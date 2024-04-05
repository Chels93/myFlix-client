const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const mongoose = require('mongoose');
const Models = require('./models.js');


const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;

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
app.get('/movies' , (req, res) => {
    Movies.find()
        .then((movies) => {
            res.status(200).json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
});

// Returns data (description, genre, director, image URL) about a single movie by title
app.get('/movies/:Title', (req, res) => {
    Movies.findOne({ Title: req.params.Title })
        .then((movie) => {
            res.json(movie);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
});

// Returns data about a genre by name/title
app.get('/movies/genre/:genreName', (req, res) => {
    Genres.findOne({ name: req.params.genreName })
        .then((genre) => {
            res.status(200).json(genre);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// Returns data about a director (bio, birth year, death year) by name
app.get('/movies/director/:directorName', (req, res) => {
    Directors.findOne({ name: req.params.directorName })
        .then((director) => {
            res.json(director);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
    });


// Returns a JSON object of all users 
app.get('/users', function (req, res) {
    Users.find()
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
app.put('/users/:userName', (req, res) => {
    Users.findOneAndUpdate (
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
app.post('/users/:userName/movies/:_id', (req, res) => {
    Users.findOneAndUpdate({ userName: req.params.userName }, 
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
app.delete('/users/:userName/movies/:ObjectId', (req, res) => {
    Users.findOneAndUpdate({ userName: req.params.userName }, 
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
app.delete('/users/:userName', (req, res) => {
    Users.findOneAndDelete({ userName: req.params.userName })
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
