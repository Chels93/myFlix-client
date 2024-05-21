import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("https://mymoviesdb-6c5720b5bef1.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            imagePath: movie.imagePath,
            title: movie.title,
            synopsis: movie.synopsis,
            year: movie.year,
            genre: {
              name: movie.genre?.name,
              description: movie.genre?.description,
            },
            director: {
              name: movie.director?.name,
              bio: movie.director?.bio,
              birthyear: movie.director?.birthyear,
              deathyear: movie.director?.deathyear,
            },
          };
        });

        setMovies(moviesFromApi);
      });
  }, []);

  if (!user) {
    return <LoginView />;
  }

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
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
