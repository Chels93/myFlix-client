import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Harry Potter and the Sorceror's Stone",
      synopsis:
        "Harry Potter, a boy who learns on his eleventh birthday that he is the orphanced son of two powerful wizards and possesses unique magical powers of his own. He is summoned from his life as an unwanted child to become a student at Hogwarts, an English boarding school for wizards. There, he meets several friends who become his closest allies and help him discover the truth about his parents and their mysterious deaths.",
      image: "image.png",
      year: "2001",
      director: {
        name: "Chris Columbus",
        bio: "Chris Joseph Columbus is an American filmmaker. Born in Spangler, Pennsylvania, Columbus studied film at Tisch School of the Arts where he developed an interest in filmmkaing.",
        birthyear: "1958",
        deathyear: "N/A",
      },
      genre: {
        name: "Adventure Fantasy",
        description:
          "A type of adventure film where the action takes place in imaginary lands with strange beasts, wizards and witches. These films contain many of the elements of the sword-and-sorcery film, but are not necessarily bound to the conventions of the sword and magic.",
      },
    },
    {
      id: 2,
      title: "Inside Out",
      synopsis:
        "Riley (Kaitlyn Dias) is a happy, hockey-loving 11-year-old Midwestern girl, but her world turns upside-down when she and her parents move to San Francisco. Riley's emotions -- let by Joy (Amy Poehler) -- try to guide her through this difficult, life-changing event. However, the stress of the move brings Sadness (phyllis Smith) to the forefront. WWhen Joy and Sadness are inadvertently swept into the far reaches of Riley's mind, the only emotions left in Headquarters are Anger, Fear and Disgust.",
      image: "image.png",
      year: "2015",
      director: {
        name: "Peter Docter",
        bio: "Peter Hans Docter is an American film director, producer, screenwriter, and animator. He has served as the chief executive officer of Pixar Animation Studios since 2018, and is best known for directing the animated feature films Monsers, Inc., Up, Inside Out, and Soul.",
        birthyear: "1968",
        deathyear: "N/A",
      },
      genre: {
        name: "Fantasy Comedy",
        description:
          "Fantasy Comedy films are types of films that use magic, supernatural and or mythological figures for comic purposes. Most fantasy comedy includes an element of parody, or satire, turning many of the fantasy conventions on their head such as the hero becoming a cowardly fool, or the princess being a klutz.",
      },
    },
    {
      id: 3,
      title: "Bourne Identity",
      synopsis:
        "The story of a man (Matt Damon), salvaged, near death, from the ocean by an Italian fishing boat. When he recuperates, the man suffers from total amnesia, without identity or background... except for a range of extraordinary talents in fighting, linguistic skills and self-defense that speak of a dangerous past. He sets out on a desperate search-assisted by the initially rebellious Marie (franka Potente) - to discover who he really is, and why he is being lethally pursued by assassins.",
      image: "image.png",
      year: "2002",
      director: {
        name: "Doug Liman",
        bio: "Douglas Eric Liman is an American film director and producer. He is known for directing the films Swingers, Go, The Bourne Identity, Mr. & Mrs. Smith, Jumper, Edge of Tomorrow, and American Made. Most of his career has been associated with the production company Hypnotic.",
        birthyear: "1965",
        deathyear: "N/A",
      },
      genre: {
        name: "Action Thriller",
        description:
          "Action thriller is a blend of both action and thriller film in which the protagonist confronts dangerous adversaries, obstacles, or situations which he/she must conquer, normally in an action setting.",
      },
    },
    {
      id: 4,
      title: "Love Actually",
      synopsis:
        "Nine intertwined stories examine the complexitites of the one emotion that connects us all: love. Among the characters explored are Dvaid (Hugh Grant), the handsome newly elected British prime minister who falls for a young junior staffer (Martine McCutcheon), Sarah (Laura Linney), a graphic designer whose devotion to her mentally ill brother complicates her love life, and Harry (Alan Rickman), a married man tempted by his attractive new secretary.",
      image: "image.png",
      year: "2003",
      director: {
        name: "Richard Curtis",
        bio: "Richard Whalley Anthony Curtis CBE is a British screenwriter, producer and film director. One of Britain's most successful comedy screenwriters, he is known primarily for romantic comedy films.",
        birthyear: "1956",
        deathyear: "N/A",
      },
      genre: {
        name: "Romantic Comedy",
        description:
          "Romantic comedy is a subgenre of comedy and romance fiction, focusing on lighthearted, humorous plot lines centered on romantic ideas, such as how true love is able to surmount most obstacles.",
      },
    },
    {
      id: 5,
      title: "What A Girl Wants",
      synopsis:
        "On a whim, American teenager Daphne (Amanda Bynes) boards a plane to England to find the father she never met. Upon arriving there, though, she makes a startling discover: the man she is looking for is Lord Henry Dashwood (Colin Firth), a member of the British upper class, who is running for political office. Lord Henry did not know Daphne existed, but he welcomes her into his life. However, she is not so sure -- and his family and his current betrothed look on her disapprovingly.",
      image: "image.png",
      director: {
        name: "Dennie Gordon",
        bio: "Dennie Gordon is an American film and television director. Her directorial television credits include Party of Five, Sports Night, Ally McBeal, The Practice, Grounded for Life, The Loop, White Collar, Burn Notice, Hell On Wheels, Waco, The Office and other series.",
        birthyear: "1953",
        deathyear: "N/A",
      },
      genre: {
        name: "Comedy",
        description:
          "Comedy is a genre of fiction that consists of discourses or works intended to be humourus or amusing by inducing laughter.",
      },
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

    return (
      <div>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </div>
    );
};