import React, { Component } from "react";
import fetchMovies from "../services/moviesSearchApi";
import CastList from "../components/CastList/CastList";
import Spinner from "../components/common/Spinner/Spinner";
import { toast } from "react-toastify";
import scroll from "../utils/scroll";

class Cast extends Component {
  state = {
    cast: null,
    isLoading: false,
    error: null,
  };

  componentDidMount() {
    this.setState({ isLoading: true });

    fetchMovies
      .fetchMovieCast(this.props.match.params.movieId)
      .then((cast) => this.setState({ cast }))
      .catch((error) =>
        this.showNotif(`Woops...Something went wrong. Error: ${error.message}`)
      )
      .finally(() => {
        this.setState({ isLoading: false });
        scroll();
      });
  }

  showNotif = (message) => {
    toast.dark(`🦄 ${message}`);
  };

  render() {
    const { cast, isLoading } = this.state;
    return (
      <>
        {isLoading && <Spinner />}
        {cast && <CastList cast={cast} />}
      </>
    );
  }
}

export default Cast;
