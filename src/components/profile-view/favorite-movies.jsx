import React from "react";
import { Link } from "react-router-dom";

function FavoriteMovies({ favoriteMovieList }) {
  return (
    <>
      <Row>
        <Col xs={12}>
          <h2>Favorite Movies</h2>
        </Col>
      </Row>
      <Row>
        {favoriteMovieList.map((movies) => {
          return (
            <Col xs={12} md={6} lg={3} key={movies._id}>
              <img src={movies.imagePath} />
              <Link to={`/movies${movies._id}`}>
                <h4>{movies.title}</h4>
              </Link>
              <Button variant="secondary" onClick={() => removeFav(movies._id)}>
                Remove From List
              </Button>
            </Col>
          );
        })}
      </Row>
    </>
  );
}
export default FavoriteMovies;
