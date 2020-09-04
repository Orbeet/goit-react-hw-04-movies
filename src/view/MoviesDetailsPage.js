import React, { Component, Suspense, lazy } from "react";
import { toast } from "react-toastify";
import { Route } from "react-router-dom";

import SubNavigation from "../components/SubNavigation/SubNavigation";
import MovieInfo from "../components/MovieInfo/MovieInfo";
import Spinner from "../components/common/Spinner/Spinner";
import Section from "../components/common/Section/Section";

import fetchMovies from "../services/moviesSearchApi";
import routes from "../routes";

const Cast = lazy(() => import("../view/Cast" /* webpackChunkName: "cast" */));
const Reviews = lazy(() =>
  import("../view/Reviews" /* webpackChunkName: "reviews" */)
);

class MoviesDetailsPage extends Component {
  state = {
    movie: null,
    isLoading: false,
    error: null,
  };

  componentDidMount() {
    this.setState({ isLoading: true });

    fetchMovies
      .fetchMovieDetails(this.props.match.params.movieId)
      .then((movie) => this.setState({ movie }))
      .catch((error) =>
        this.showNotif(
          `Woops...Something went wrong. Error: ${error.status_message}`
        )
      )
      .finally(() => this.setState({ isLoading: false }));
  }

  showNotif = (message) => {
    toast.dark(`🦄 ${message}`);
  };

  handleClick = () => {
    const { state } = this.props.location;
    state && state.from
      ? this.props.history.push(state.from)
      : this.props.history.push(routes.movies);
  };

  render() {
    const { isLoading, movie } = this.state;
    const { location } = this.props;
    return (
      <div>
        {isLoading && <Spinner />}
        {movie && (
          <div>
            <button type="button" onClick={this.handleClick}>
              <span>&#8678;</span>
              Go back
            </button>

            {movie.status_code === 34 ? (
              <p>Sorry,can't get details about this movie</p>
            ) : (
              <>
                <MovieInfo movie={movie} />
                <Section title="Additional information">
                  <SubNavigation
                    id={this.state.movie.id}
                    locationToSend={
                      location.state && location.state.from
                        ? location.state.from
                        : routes.movies
                    }
                  />
                </Section>
              </>
            )}
            <Suspense fallback={<Spinner />}>
              <Route path={routes.cast} component={Cast} />
              <Route path={routes.reviews} component={Reviews} />
            </Suspense>
          </div>
        )}
      </div>
    );
  }
}

export default MoviesDetailsPage;
