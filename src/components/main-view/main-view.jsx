import { useState } from "react";
import { MovieCard } from "..movie-card/movie-card";
import { MovieView } from "..movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Harry Potter and the Sorceror's Stone",
      image: "imagepath.jpg",
      director: "Chris Columbus",
    },
    {
      id: 2,
      title: "Inside Out",
      image: "imagepath.jpg",
      director: "Peter Docter",
    },
    {
      id: 3,
      title: "Bourne Identity",
      image: "imagepath.jpg",
      director: "Doug Liman",
    },
    {
      id: 4,
      title: "Love Actually",
      image: "imagepath.jpg",
      director: "Richard Curtis",
    },
    {
      id: 5,
      title: "What A Girl Wants",
      image: "imagepath.jpg",
      director: "Dennie Gordon",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedBook(null)} />
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
          onClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
