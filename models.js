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

let userSchema = mongoose.Schema({
    userName: {type: String, required: true},
    Password: {type: String, required: true},
    email: {type: String, required: true},
    birthdate: Date,
    favoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
