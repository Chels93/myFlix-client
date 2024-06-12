import React from "react";

function FavoriteMovies({ favoriteMovieList }) {
  return (
    <div>
      <h2>Favorite Movies</h2>
      {favoriteMovieList.map((movies) => {
        return (
          <div key={movies._id}>
            <img src={movies.imagePath} />
            <Link to={`/movies${movies._id}`}>
              <h4>{movies.title}</h4>
            </Link>
            <Button variant="secondary" onClick={() => removeFav(movies._id)}>
              Remove From List
            </Button>
          </div>
        );
      })}
    </div>
  );
}

export default FavoriteMovies;
