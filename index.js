const express = require("express");
const app = express ();

//Log Requests (Morgan Middleware)
let myLogger = (req, res, next) => {
    console.log(req.url);
    next();
};

let requestTime = (req, res, next) => {
    req. requestTime = Date.now();
    next ();
};

app.use(myLogger);
app.use(requestTime);

//define topMovies
let topMovies = [
    {
        title: 'Harry Potter and the Sorcerer\'s Stone',
        genre: 'Action',
    },
    {
        title: 'How to Train Your Dragon',
        genre: 'Kids Animation',
    },
    {
        title: 'Bourne Identity',
        genre: 'Action',
    },
    {
        title: 'Love Actually',
        genre: 'Romantic Comedy',
    },
    {
        title: 'The Lion King',
        genre: 'Kids Animation',
    },
    {
        title: 'The Princess Diaries',
        genre: 'Romantic Comedy',
    },
    {
        title: 'The Santa Clause',
        genre: 'Holiday',
    },
    {
        title: 'The Lord of the Rings',
        genre: 'Action, Adventure, Fantasy',
    },
    {
        title: 'Casablanca',
        genre: 'Romance, Action',
    },
    {
        title: 'The Martian',
        genre: 'Action',
    },
]

app.get('/', (req, res) => {
    let responseText = 'Your Top Movies';
    responseText += '<small>Requested at: ' + req.requestTime + '</small>';
    res.send(responseText);
});

app.get('/secreturl', (req, res) => {
    let responseText = 'This is a secret url with super top-secret content.';
    responseText += '<small>Requested at: ' + req.requestTime + '</small>';
    res.send(responseText);
});

app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', { root: __dirname });
});

// Returns a list of all movies to the user
app.get('/movies' , (req, res) => {
    res.json(topMovies);
});

// Returns data (description, genre, director, image URL) about a single movie by title
app.get('/movies/:title', (req, res) => {
    res.json(movies.find((movie) => 
    { return movie.title === req.params.title }));
});

// Returns data about a genre by name/title
app.get('/movies/genres/:genreName', (req, res) => {
    res.json(movies.find((movie) => 
    { return movie.genreName === req.params.genreName }));
});

// Returns data about a director (bio, birth year, death year) by name
app.get('/movies/directors/:directorName', (req, res) => {
    res.json(movies.find((movie) =>
    { return movie.directorName === req.params.directorName }));
});

// Allows new users to register
app.post('/users', (req, res) => {
    let newUser = req.body;

    if (!newUser.name) {
        const message = 'Missing in request body.';
        res.status(400).send(message);
    } else {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).send(newUser);
    }
});

// Allows users to update their user info (birthday)
app.put('users/:userName', (req, res) => {
    let user = users.find((user) => { return user.name === req.params.name });

    if (user) {
        user.birthday[req.params.birthday] = parseInt(req.params.birthday);
        res.status(201).send('User ' + req.params.name + 'updated their birthday to ' + req.params.birthday);
    } else {
        res.status(404).send('User with the name ' + req.params.name + 'was not found.');
    }
});


// Allows users to add a movie to their list of favorites
app.post('/users/:userName/movies/:movieID', (req, res) => {
    let newFavorite = req.body;

    if (!newFavorite.name) {
        const message = 'Missing name in request body';
        res.status(400).send(message);
    } else {
        newFavorite.id = uuid.v4();
        users.push(newFavorite);
        res.status(201).send(newFavorite);
    }
});

// Allows users to remove a movie from their list of favorites
app.delete('/users/:userName/movies/:movieID', (req, res) => {
    let user = users.find((user) => { return user.id === req.params.id });

    if (user) {
        users = users.filter ((obj) => { return obj.id !== req.params.id });
        res.status(201).send('Movie ' + req.params.id + 'was deleted.');
    }
});

// Allows existing users to deregister 
app.delete('/users/:userName', (req, res) => {
    let user = users.find((userName) => { return user.id === req.params.id});

    if (user) {
        users = users.filter((obj) => { return obj.id !== req.params.id });
        res.status(201).send('User ' + req.params.id + 'was deleted.');
    }
});

//Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});
