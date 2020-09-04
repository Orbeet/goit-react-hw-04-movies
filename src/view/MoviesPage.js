import React, { Component } from "react";
import { toast } from "react-toastify";

import SearchForm from "../components/SearchForm/SearchForm";
import MoviesList from "../components/MoviesList/MoviesList";
import Spinner from "../components/common/Spinner/Spinner";

import fetchMovies from "../services/moviesSearchApi";
import getQueryParams from "../utils/getQueryParams";

class MoviesPage extends Component {
  state = {
    movies: [],
    isLoading: false,
    error: null,
  };

  componentDidMount() {
    const { query } = getQueryParams(this.props.location.search);
    if (query) {
      this.fetchMovies(query);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { query: prevQuery } = getQueryParams(prevProps.location.search);
    const { query: nextQuery } = getQueryParams(this.props.location.search);

    if (prevQuery !== nextQuery) {
      this.fetchMovies(nextQuery);
    }
  }

  fetchMovies = (someQuery) => {
    this.setState({ isLoading: true });
    fetchMovies
      .fetchMoviesWithQuery(someQuery)
      .then((movies) => {
        if (movies.length === 0) {
          this.showNotif("Sorry! No matches found.");
        }
        this.setState({ movies });
      })
      .catch((error) =>
        this.showNotif(`Woops...Something went wrong. Error: ${error.message}`)
      )
      .finally(() => this.setState({ isLoading: false }));
  };

  changeQuery = (query) => {
    if (!query) {
      this.showNotif("Please, enter some query");
      return;
    }
    this.props.history.push({
      ...this.props.location,
      search: `query=${query}`,
    });
  };

  showNotif = (message) => {
    toast.dark(`🦄 ${message}`);
  };

  render() {
    const { movies, isLoading } = this.state;

    return (
      <>
        <SearchForm onSubmit={this.changeQuery} />
        {isLoading && <Spinner />}
        {movies.length > 0 && <MoviesList {...this.props} movies={movies} />}
      </>
    );
  }
}

export default MoviesPage;
