import React from "react";
import PropTypes from "prop-types";
import { Button, Row, Col, Figure } from "react-bootstrap";
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
        {favoriteMovieList.map(({ imagePath, title, _id }) => {
          return (
            <Col xs={12} md={6} lg={3} key={_id}>
              <Figure>
                <Link to={`/movies/${_id}`}>
                  <Figure.Image variant="top" src={imagePath} alt={title} />
                  <Figure.Caption>{title}</Figure.Caption>
                </Link>
              </Figure>
              <Button variant="secondary" onClick={() => removeFav(movie._id)}>
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
