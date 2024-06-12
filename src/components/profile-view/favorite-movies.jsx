import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const FavoriteMovies = ({ favoriteMovieList, removeFav }) => {
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
};

FavoriteMovies.propTypes = {
  favoriteMovieList: PropTypes.array.isRequired,
  removeFav: PropTypes.func.isRequired,
};

export default FavoriteMovies;
