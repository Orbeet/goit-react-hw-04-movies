import React, { Component } from "react";
import { toast } from "react-toastify";

import MoviesList from "../components/MoviesList/MoviesList";
import Spinner from "../components/common/Spinner/Spinner";

import fetchMovies from "../services/moviesSearchApi";

class HomePage extends Component {
  state = {
    trendMovies: [],
    isLoading: false,
    error: null,
  };

  componentDidMount() {
    this.setState({ isLoading: true });

    fetchMovies
      .fetchTrendingMovies()
      .then((movies) => this.setState({ trendMovies: movies }))
      .catch((error) =>
        this.showNotif(`Woops...Something went wrong. Error: ${error.message}`)
      )
      .finally(() => this.setState({ isLoading: false }));
  }

  showNotif = (message) => {
    toast.dark(`🦄 ${message}`);
  };

  render() {
    const { trendMovies, isLoading } = this.state;

    return (
      <>
        <h2>Trending Movies</h2>
        {isLoading && <Spinner />}
        {trendMovies.length > 0 && (
          <MoviesList {...this.props} movies={trendMovies} />
        )}
      </>
    );
  }
}

export default HomePage;
