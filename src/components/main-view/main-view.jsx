import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Harry Potter and the Sorceror`s Stone",
      image: "https://i.ebayimg.com/images/g/nHQAAOSwQ8hhoMr~/s-l1600.jpg",
      director: "Chris Columbus",
    },
    {
      id: 2,
      title: "Inside Out",
      image:
        "https://cdn.printerval.com/unsafe/960x960/asset.prtvstatic.com/2024/04/08/66138aa6e14a11.34079191.png",
      director: "Peter Docter",
    },
    {
      id: 3,
      title: "Bourne Identity",
      image: "https://i.ebayimg.com/images/g/A9UAAOSwiDFYNI7u/s-l1600.jpg",
      director: "Doug Liman",
    },
    {
      id: 4,
      title: "Love Actually",
      image:
        "https://m.media-amazon.com/images/I/5199VZVD6KL._SX300_SY300_QL70_FMwebp_.jpg",
      director: "Richard Curtis",
    },
    {
      id: 5,
      title: "What A Girl Wants",
      image:
        "https://m.media-amazon.com/images/I/51e0MZf+32L._AC_UF894,1000_QL80_.jpg",
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
