import React from "react";
import PropTypes from "prop-types";
import fetchMovies from "../../services/moviesSearchApi";
import styles from "./CastList.module.scss";

function CastList({ cast }) {
  return (
    <>
      {cast.length > 0 ? (
        <ul className={styles.castList}>
          {cast.map(({ id, name, character, profile_path }) => (
            <li key={id} className={styles.castList_item}>
              <img
                src={
                  profile_path
                    ? `${fetchMovies.path_tmdb}/w200${profile_path}`
                    : fetchMovies.no_image
                }
                alt="movie actor"
              />
              <p>{name}</p>
              <p>Character: {character}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We have no casts to this movies</p>
      )}
    </>
  );
}

CastList.propTypes = {
  cast: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      character: PropTypes.string.isRequired,
      profile_path: PropTypes.string,
    })
  ),
};

export default CastList;
