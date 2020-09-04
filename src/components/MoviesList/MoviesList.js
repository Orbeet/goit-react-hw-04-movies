import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import fetchMovies from "../../services/moviesSearchApi";
import routes from "../../routes";
import styles from "./MoviesList.module.scss";

function MoviesList(props) {
  const { movies, location } = props;

  return (
    <ul className={styles.moviesList}>
      {movies.map(({ id, title, name, poster_path }) => (
        <li key={id} className={styles.moviesList_item}>
          <img
            src={
              poster_path
                ? `${fetchMovies.path_tmdb}/w200${poster_path}`
                : fetchMovies.no_poster
            }
            alt="film poster"
          />
          <NavLink
            to={{
              pathname: `${routes.movies}/${id}`,
              state: { from: location },
            }}
            className={styles.moviesList_link}
            activeClassName={styles.moviesList_activeLink}
          >
            {name || title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default MoviesList;
