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

app.get('/movies' , (req, res) => {
    res.json(topMovies);
});

//Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});
