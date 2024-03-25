const express = require("express");
const app = express();
const uuid = require("uuid");

// Middleware to parse JSON bodies
app.use(express.json());

//Log Requests (Morgan Middleware)
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

//define topMovies
let topMovies = [
    {
        movieId: '01',
        title: 'Harry Potter and the Sorcerer`s Stone',
        synopsis: 'Harry Potter, a boy who learns on his eleventh birthday that he is the orphaned son of two powerful wizards and possesses unique magical powers of his own. He is summoned from his life as an unwanted child to become a student at Hogwarts, an English boarding school for wizards. There, he meets several friends who become his closest allies and help him discover the truth about his parents and their mysterious deaths.',
        imagePath: 'image.png',
        year: '2001',
        director: 
            {
                directorId: '1',
                name: 'Chris Columbus',
                bio: 'Chris Joseph Columbus is an American filmmaker. Born in Spangler, Pennsylvania, Columbus studied film at Tisch School of the Arts where he developed an interest in filmmaking.',
                birthyear: '1958-09-10',
                deathyear: 'Null',
            },
        genre: 
            { 
                genreId: '1',
                name: 'Adventure Fantasy',
                description: 'A type of adventure film where the action takes place in imaginary lands with strange beasts, wizards and witches. These films contain many of the elements of the sword-and-sorcery film, but are not necessarily bound to the conventions of the sword and magic.',
            },
    },
    {
        movieId: '2',
        title: 'Inside Out',
        synopsis: 'Riley (Kaitlyn Dias) is a happy, hockey-loving 11-year-old Midwestern girl, but her world turns upside-down when she and her parents move to San Francisco. Rileys emotions -- led by Joy (Amy Poehler) -- try to guide her through this difficult, life-changing event. However, the stress of the move brings Sadness (Phyllis Smith) to the forefront. When Joy and Sadness are inadvertently swept into the far reaches of Riley`s mind, the only emotions left in Headquarters are Anger, Fear and Disgust.',
        imagePath: 'image.png',
        year: '2015',
        director: 
            {
                directorId: '2',
                name: 'Peter Docter',
                bio: 'Peter Hans Docter is an American film director, producer, screenwriter, and animator. He has served as the chief creative officer of Pixar Animation Studios since 2018, and is best known for directing the animated feature films Monsters, Inc., Up, Inside Out, and Soul.',
                birthyear: '1968-10-09',
                deathyear: 'Null',
            },
        genre: 
            { 
                genreId: '2',
                name: 'Fantasy Comedy',
                description: 'Fantasy comedy films are types of films that uses magic, supernatural and or mythological figures for comic purposes. Most fantasy comedy includes an element of parody, or satire, turning many of the fantasy conventions on their head such as the hero becoming a cowardly fool, the princess being a klutz.',
            },
    },
    {
        movieId: '3',
        title: 'Bourne Identity',
        synopsis: 'The story of a man (Matt Damon), salvaged, near death, from the ocean by an Italian fishing boat. When he recuperates, the man suffers from total amnesia, without identity or background... except for a range of extraordinary talents in fighting, linguistic skills and self-defense that speak of a dangerous past. He sets out on a desperate search-assisted by the initially rebellious Marie (Franka Potente) - to discover who he really is, and why he is being lethally pursued by assassins.',
        imagePath: 'image.png',
        year: '2002',
        director: 
            {
                directorId: '3',
                name: 'Doug Liman',
                bio: 'Douglas Eric Liman is an American film director and producer. He is known for directing the films Swingers, Go, The Bourne Identity, Mr. & Mrs. Smith, Jumper, Edge of Tomorrow, and American Made. Most of his career has been associated with the production company Hypnotic.',
                birthyear: '1965-07-24',
                deathyear: 'Null',
            },
        genre: 
            { 
                genreId: '3',
                name: 'Action Thriller',
                description: 'Action thriller is a blend of both action and thriller film in which the protagonist confronts dangerous adversaries, obstacles, or situations which he/she must conquer, normally in an action setting.',
            },
    },
    {
        movieId: '4',
        title: 'Love Actually',
        synopsis: 'Nine intertwined stories examine the complexities of the one emotion that connects us all: love. Among the characters explored are David (Hugh Grant), the handsome newly elected British prime minister who falls for a young junior staffer (Martine McCutcheon), Sarah (Laura Linney), a graphic designer whose devotion to her mentally ill brother complicates her love life, and Harry (Alan Rickman), a married man tempted by his attractive new secretary.',
        imagePath: 'image.png',
        year: '2003',
        director: 
            {
                directorId: '4',
                name: 'Richard Curtis',
                bio: 'Richard Whalley Anthony Curtis CBE (born 8 November 1956) is a British screenwriter, producer and film director. One of Britains most successful comedy screenwriters, he is known primarily for romantic comedy films.',
                birthyear: '1956-11-08',
                deathyear: 'Null',
            },
        genre: 
            { 
                genreId: '4',
                name: 'Romantic Comedy',
                description: 'Romantic comedy is a subgenre of comedy and romance fiction, focusing on lighthearted, humorous plot lines centered on romantic ideas, such as how true love is able to surmount most obstacles.',
            },
    },
    {
        movieId: '5',
        title: 'What A Girl Wants',
        synopsis: 'On a whim, American teenager Daphne (Amanda Bynes) boards a plane to England to find the father she never met. Upon arriving there, though, she makes a startling discovery: The man she is looking for is Lord Henry Dashwood (Colin Firth), a member of the British upper class, who is running for political office. Lord Henry did not know Daphne existed, but he welcomes her into his life. However, she is not so sure -- and his family and his current betrothed look on her disapprovingly.',
        imagePath: 'image.png',
        year: '2003',
        director: 
            {
                directorId: '5',
                name: 'Dennie Gordon',
                bio: 'Dennie Gordon is an American film and television director. Her directorial television credits include Party of Five, Sports Night, Ally McBeal, The Practice, Grounded for Life, The Loop, White Collar, Burn Notice, Hell on Wheels, Waco, The Office and other series.',
                birthyear: '1953-05-09',
                deathyear: 'Null',
            },
        genre: 
            { 
                genreId: '5',
                name: 'Comedy',
                description: 'Comedy is a genre of fiction that consists of discourses or works intended to be humourous or amusing by inducing laughter.',
            },
    },
    {
        movieId: '6',
        title: 'The Princess Diaries',
        synopsis: 'Shy San Francisco teenager Mia Thermopolis (Anne Hathaway) is thrown for a loop when, from out of the blue, she learns the astonishing news that she is a real-life princess! As the heir apparent to the crown of the small European principality of Genovia, Mia begins a comical journey toward the throne when her strict and formidable grandmother, Queen Clarisse Renaldi (Julie Andrews), shows up to give her princess lessons.',
        imagePath: 'image.png',
        year: '2001',
        director: 
            {
                directorId: '6',
                name: 'Garry Marhsall',
                bio: 'Garry Kent Marshall was an American screenwriter, film director, producer and actor. Marshall began his career in the 1960s as a writer for The Lucy Show and Dick Van Dyke Show until he developed the television adaptation of Neil Simons play The Odd Couple.',
                birthyear: '1934-11-13',
                deathyear: '2016-07-19',
            },
        genre: 
            { 
                genreId: '5',
                name: 'Comedy',
                description: 'Comedy is a genre of fiction that consists of discourses or works intended to be humourous or amusing by inducing laughter.',
            },
    },
    {
        movieId: '7',
        title: 'The Santa Clause',
        synopsis: 'Divorced dad Scott (Tim Allen) has custody of his son (Eric Lloyd) on Christmas Eve. After he accidentally kills a man in a Santa suit, they are magically transported to the North Pole, where an elf explains that Scott must take Santas place before the next Christmas arrives. Scott thinks hes dreaming, but over the next several months he gains weight and grows an inexplicably white beard. Maybe that night at the North Pole was not a dream after all -- and maybe Scott has a lot of work to do.',
        imagePath: 'image.png',
        year: '1994',
        director: 
            {
                directorId: '7',
                name: 'John Pasquin',
                bio: 'John Pasquin is an American director of film, television and theatre.',
                birthyear: '1944-11-30',
                deathyear: 'Null',
            },
        genre: 
            { 
                genreId: '5',
                name: 'Comedy',
                description: 'Comedy is a genre of fiction that consists of discourses or works intended to be humourous or amusing by inducing laughter.',
            },
    },
    {
        movieId: '8',
        title: 'The Lord of the Rings',
        synopsis: 'In the Second Age of Middle-earth, the lords of Elves, Dwarves, and Men are given Rings of Power. Unbeknownst to them, the Dark Lord Sauron forges the One Ring in Mount Doom, instilling into it a great part of his power, to dominate the other Rings and conquer Middle-earth.',
        imagePath: 'image.png',
        year: '2001',
        director: 
            {
                directorId: '8',
                name: 'Peter Jackson',
                bio: 'Sir Peter Robert Jackson ONZ KNZM is a New Zealand film director, screenwriter and producer. He is best known as the director, writer and producer of the Lord of the Rings trilogy and the Hobbit trilogy, both of which are adapted from the novels of the same name by J. R. R. Tolkien.',
                birthyear: '1961-10-31',
                deathyear: 'Null',
            },
        genre: 
            {
                genreId: '1',
                name: 'Adventure Fantasy',
                description: 'A type of adventure film where the action takes place in imaginary lands with strange beasts, wizards and witches. These films contain many of the elements of the sword-and-sorcery film, but are not necessarily bound to the conventions of the sword and magic.',
            },
    },
    {
        movieId: '9',
        title: 'Casablanca',
        synopsis: 'Rick Blaine (Humphrey Bogart), who owns a nightclub in Casablanca, discovers his old flame Ilsa (Ingrid Bergman) is in town with her husband, Victor Laszlo (Paul Henreid). Laszlo is a famed rebel, and with Germans on his tail, Ilsa knows Rick can help them get out of the country.',
        imagePath: 'image.png',
        year: '1942',
        director:
            {
                directorId: '9',
                name: 'Michael Curtiz',
                bio: 'Michael Curtiz was a Hungarian-American film director, recognized as one of the most prolific directors in history. He directed classic films from the silent era and numerous others during the Golden Age of Hollywood, when the studio system was prevalent.',
                birthyear: '1886-12-24',
                deathyear: '1962-04-10',
            },
        genre: 
            { 
                genreId: '6',
                name: 'Romance',
                description: 'This genre focuses on the relationship and romantic love between two people, typically with an emotionally satisfying and optimistic ending.',
            },
    },
    {
        movieId: '10',
        title: 'The Martian',
        synopsis: 'When astronauts blast off from the planet Mars, they leave behind Mark Watney (Matt Damon), presumed dead after a fierce storm. With only a meager amount of supplies, the stranded visitor must utilize his wits and spirit to find a way to survive on the hostile planet. Meanwhile, back on Earth, members of NASA and a team of international scientists work tirelessly to bring him home, while his crew mates hatch their own plan for a daring rescue mission.',
        imagePath: 'image.png',
        year: '2015',
        director:
            {
                directorId: '10',
                name: 'Ridley Scott',
                bio: 'Sir Ridley Scott GBE is an English filmmaker. He is best known for directing films in the science fiction, crime and historical drama genres. His work is known for its atmospheric and highly concentrated visual style.',
                birthyear: '1937-11-30',
                deathyear: 'Null',
            },
        genre: 
            { 
                genreId: '7',
                name: 'Science Fiction',
                description: 'Science fiction is a genre of speculative fiction dealing with imaginative concepts such as futuristic science and technology, space travel, time travel, faster than light travel, parallel universes and extraterrestrial life.',
            },
    },
    {
        movieId: '11',
        title: 'Rent',
        synopsis: 'In this musical, set at the dawn of the 1990s, a group of New Yorkers struggle with their careers, love lives and the effects of the AIDS epidemic on their community. Mark (Anthony Rapp), an aspiring filmmaker, and Roger (Adam Pascal), an HIV-positive musician, scramble for money to pay rent to their landlord and former roommate, Benny (Taye Diggs). Meanwhile, their friend Tom (Jesse L. Martin), a professor, has fallen for Angel (Wilson Jermaine Heredia), who is slowly dying of AIDS.',
        imagePath: 'image.png',
        year: '2005',
        director:
            {
                directorId: '1',
                name: 'Chris Columbus',
                bio: 'Chris Joseph Columbus is an American filmmaker. Born in Spangler, Pennsylvania, Columbus studied film at Tisch School of the Arts where he developed an interest in filmmaking.',
                birthyear: '1958-09-10',
                deathyear: 'Null',
            },
        genre: 
            { 
                genreId: '8',
                name: 'Musical',
                description: 'Musical film is a film genre in which songs by the characters are interwoven into the narrative, sometimes accompanied by dancing. The songs usually advance the plot or develop the film`s characters, but in some cases, they serve merely as breaks in the storyline, often as elaborate "production numbers".',
            },
    },
    {
        movieId: '12',
        title: 'About Time',
        synopsis: 'When Tim Lake (Domhnall Gleeson) is 21, his father (Bill Nighy) tells him a secret: The men in their family can travel through time. Although he can`t change history, Tim resolves to improve his life by getting a girlfriend. He meets Mary (Rachel McAdams), falls in love and finally wins her heart via time-travel and a little cunning. However, as his unusual life progresses, Tim finds that his special ability can`t shield him and those he loves from the problems of ordinary life.',
        imagePath: 'image.png',
        year: '2013',
        director: 
            {
                directorId: '4',
                name: 'Richard Curtis',
                bio: 'Richard Whalley Anthony Curtis CBE (born 8 November 1956) is a British screenwriter, producer and film director. One of Britains most successful comedy screenwriters, he is known primarily for romantic comedy films.',
                birthyear: '1956-11-08',
                deathyear: 'Null',
            },
        genre: 
            { 
                genreId: '6',
                name: 'Romance',
                description: 'This genre focuses on the relationship and romantic love between two people, typically with an emotionally satisfying and optimistic ending.',
            },
    },
    {
        movieId: '13',
        title: 'Monsters Inc.',
        synopsis: 'Monsters Incorporated is the largest scare factory in the monster world, and James P. Sullivan (John Goodman) is one of its top scarers. Sullivan is a huge, intimidating monster with blue fur, large purple spots and horns. His scare assistant, best friend and roommate is Mike Wazowski (Billy Crystal), a green, opinionated, feisty little one-eyed monster. Visiting from the human world is Boo (Mary Gibbs), a tiny girl who goes where no human has ever gone before.',
        imagePath: 'image.png',
        year: '2001',
        director: 
            {
                directorId: '2',
                name: 'Peter Docter',
                bio: 'Peter Hans Docter is an American film director, producer, screenwriter, and animator. He has served as the chief creative officer of Pixar Animation Studios since 2018, and is best known for directing the animated feature films Monsters, Inc., Up, Inside Out, and Soul.',
                birthyear: '1968-10-09',
                deathyear: 'Null',
            },
        genre: 
            { 
                genreId: '2',
                name: 'Fantasy Comedy',
                description: 'Fantasy comedy films are types of films that uses magic, supernatural and or mythological figures for comic purposes. Most fantasy comedy includes an element of parody, or satire, turning many of the fantasy conventions on their head such as the hero becoming a cowardly fool, the princess being a klutz.',
            },
    },
    {
        movieId: '14',
        title: 'Runaway Bride',
        synopsis: 'Having already left three grooms at the altar, Maggie Carpenter (Julia Roberts) is branded "the runaway bride" by jaded city journalist Ike Graham (Richard Gere). But, after his facts are called into question, Ike races to Maggie`s hometown to save his reputation and report on her upcoming fourth trip down the aisle -- during which he`s convinced she`ll run again. Though he`s there on a muckraking mission, Ike can`t help but fall for this breathtaking heartbreaker.',
        imagePath: 'image.png',
        year: '1999',
        director: 
            {
                directorId: '6',
                name: 'Garry Marhsall',
                bio: 'Garry Kent Marshall was an American screenwriter, film director, producer and actor. Marshall began his career in the 1960s as a writer for The Lucy Show and Dick Van Dyke Show until he developed the television adaptation of Neil Simons play The Odd Couple.',
                birthyear: '1934-11-13',
                deathyear: '2016-07-19',
            },
        genre: 
            { 
                genreId: '4',
                name: 'Romantic Comedy',
                description: 'Romantic comedy is a subgenre of comedy and romance fiction, focusing on lighthearted, humorous plot lines centered on romantic ideas, such as how true love is able to surmount most obstacles.',
            },
    }
];

// define Users
let users = [
    {
        userId: '1',
        userName: 'TestUser1',
        password: '1234',
        email: 'testuser1@email.com',
        birthdate: '2001-01-01',
        favorite_movies: [
          '1', '2', '3'
        ]
    },
    {
        userId: '2',
        userName: 'TestUser2',
        password: '5678',
        email: 'testuser2@email.com',
        birthdate: '2002-02-02',
        favorite_movies: [
          '4', '5', '6'
        ]
    },
    {
        userId: '3',
        userName: 'TestUser3',
        password: '9101',
        email: 'testuser3@email.com',
        birthdate: '2003-03-03',
        favorite_movies: [
          '7', '8', '9'
        ]
    },
    {
        userId: '4',
        userName: 'TestUser4',
        password: '1213',
        email: 'testuser4@email.com',
        birthdate: '2004-04-04',
        favorite_movies: [
          '1', '10', '11'
        ]
    },
    {
        userId: '5',
        userName: 'TestUser5',
        password: '1111',
        email: 'testuser5@email.com',
        birthdate: '2005-05-05',
        favorite_movies: [
          '2', '3', '4'
        ]
    }
];

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
    res.json(topMovies.find((movie) => movie.title === req.params.title));
});

// Returns data about a genre by name/title
app.get('/movies/genres/:genreName', (req, res) => {
    const genreName = req.params.genreName;
    const movies = topMovies.filter((movie) => movie.genre.name === genreName);

    if (movies.length > 0) {
        const genreInfo = {
            genreName: genreName,
            description: movies[0].genre.description,
            movies: movies.map(movie => ({
                title: movie.title,
            }))
        };
        res.json(genreInfo);
    } else {
        res.status(404).send('Genre with the name ' + genreName + ' was not found.');
    }
});

// Returns data about a director (bio, birth year, death year) by name
app.get('/movies/directors/:directorName', (req, res) => {
    const directorName = req.params.directorName;
    const director = topMovies.find((movie) => movie.director.name === directorName)?.director;

    if (director) {
        const directorInfo = {
            name: director.name,
            bio: director.bio,
            birthyear: director.birthyear,
            deathyear: director.deathyear
        };
        res.json(directorInfo);
    } else {
        res.status(404).send('Director with the name ' + directorName + ' was not found.');
    }
});

// Allows new users to register
app.post('/users', (req, res) => {
    let newUser = req.body;

    if (!isValidUser(newUser)) {
        return res.status(400).json({ error: 'Invalid user data.' });
    }
    newUser.userId = generateUUID();
    users.push(newUser);
    res.status(201).json({ message: 'User created successfully.', userId: newUser.userId });
});

function isValidUser(user) {
    return user && 
        typeof user.userName === 'string' &&
        typeof user.password === 'string' &&
        typeof user.email === 'string' &&
        typeof user.birthday === 'string';
}

function generateUUID() {
    return uuid.v4();
}
   
// Allows users to update their user info (birthday)
app.put('/users/:userName', (req, res) => {
    const userId = req.params.userId;
    const updatedFields = req.body;

    const userIndex = users.findIndex(user => user.userId === userId);

    if (userIndex === -1) {
        return res.status(404).json({ error: 'User with the ID `${userId}` was not found.' });
    }

    const user = users[userIndex];

    // Update user's information
    for (const field in updatedFields) {
        if (Object.prototype.hasOwnProperty.call(updatedFields, field)) {
            switch (field) {
                case 'userName':
                    user.userName = updatedFields.userName;
                    break;
                case 'password':
                    user.password = updatedFields.password;
                    break;
                case 'email':
                    user.email = updatedFields.email;
                    break;
                case 'birthday':
                    if (!isValidDateFormat(updatedFields.birthday)) {
                        return res.status(400).json({ error: 'Invalid birthday format. Please provide a valid date in format MM/DD/YYYY.'});
                    }
                    user.birthday = updatedFields.birthday;
                    break;
                case 'favortieMovies':
                    user.favoriteMovies = updatedFields.favoriteMovies;
                    break;
                default:
                    // Ignore unknown fields
                    break;
            }
        }
    }
    // Sucess response
    res.status(200).json({ message: 'User with ID `${userId}` was updated successfully.'});
});

// Function validates date format (MM/DD/YYYY)
function isValidDateFormat(dateString) {
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
    return regex.test(dateString);
}

// Allows users to add a movie to their list of favorites
app.post('/users/:userName/movies/:movieId', (req, res) => {
    let user = users.find((user) => user.userName === req.params.userName);

    if (!user) {
        res.status(404).send('User with the name ' + req.params.userName + ' was not found.');
    } else {
        let movieId = req.params.movieId;
        if (!user.favoriteMovies.includes(movieId)) {
            user.favoriteMovies.push(movieId);
            res.status(201).send('Movie ' + movieId + ' was added to favorites for user ' + req.params.userName);
        } else {
            res.status(400).send('Movie ' + movieId + ' is already in favorties for user ' + req.params.userName);
        }
    }
});

// Allows users to remove a movie from their list of favorites
app.delete('/users/:userName/movies/:movieId', (req, res) => {
    let user = users.find((user) => user.userName === req.params.userName );

    if (!user) {
        res.status(404).send('User with the name ' + req.params.userName + ' was not found.');
    } else {
        let movieId = req.params.movieId;
        if (user.favoriteMovies.includes(movieId)) {
            user.favoriteMovies = user.favoriteMovies.filter(id => id !== movieId);
            res.status(200).send('Movie ' + movieId + ' was removied from favorites for user ' + req.params.userName);
        } else {
            res.status(400).send('Movie ' + movieId + ' is not in favorites for user ' + req.params.userName);
        }
    }
});

// Allows existing users to deregister 
app.delete('/users/:userName', (req, res) => {
    let index = users.findIndex((user) => user.userName === req.params.userName);

    if (index !== -1) {
        users.splice(index, 1);
        res.status(200).send('User ' + req.params.userName + ' was deleted.');
    } else {
        res.status(404).send('User with the name ' + req.params.userName + ' was not found.');
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
