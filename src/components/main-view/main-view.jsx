import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/moview-view";

export const MovieView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Harry Potter and the Sorceror's Stone",
      image: "image.png",
      director: "Chris Columbus",
    },
    {
      id: 2,
      title: "Inside Out",
      image: "image.png",
      director: "Peter Docter",
    },
    {
      id: 3,
      title: "Bourne Identity",
      image: "image.png",
      director: "Doug Liman",
    },
    {
      id: 4,
      title: "Love Actually",
      image: "image.png",
      director: "Richard Curtis",
    },
    {
      id: 5,
      title: "What A Girl Wants",
      image: "image.png",
      director: "Dennie Gordon",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  } else {
    return (
      <div>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={() => {
              setSelectedMovie(movie);
            }}
          />
        ))}
      </div>
    );
  }
};

// This may need to be moved to other files
import { MainView } from "./components/main-view/main-view";
