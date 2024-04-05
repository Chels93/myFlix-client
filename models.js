const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
    Title: {type: String, required: true},
    Synopsis: {type: String, required: true},
    Genre: {
        Name: String,
        Description: String
    },
    Director: {
        Name: String, 
        Bio: String
    },
    Actors: [String],
    imagePath: String,
    Featured: Boolean,
});
let directorSchema = mongoose.Schema({
    _id:{ type: mongoose.Schema.Types.ObjectId, ref: 'directors', required: true},
    Name:{type: String, required: true},
    Bio:{type: String, required: true}, 
    Birthyear: Date,
    Deathyear: Date   
});
let genreSchema = mongoose.Schema({
    _id:{ type: mongoose.Schema.Types.ObjectId, ref: 'genre', required: true},
    Name:{type: String, required: true},
    Description:{type: String, required: true} 
});

let userSchema = mongoose.Schema({
    userName: {type: String, required: true},
    Password: {type: String, required: true},
    email: {type: String, required: true},
    birthdate: Date,
    favoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);
let Director = mongoose.model('Director', directorSchema)
let Genre = mongoose.model('Genre', genreSchema);

module.exports.Movie = Movie;
module.exports.User = User;
module.exports.Director = Director;
module.exports.Genre = Genre;
