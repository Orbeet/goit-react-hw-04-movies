import React, { Component } from "react";
import Reviews from "../components/Reviews/Reviews";
import Spinner from "../components/common/Spinner/Spinner";
import { toast } from "react-toastify";
import fetchMovies from "../services/moviesSearchApi";
import scroll from "../utils/scroll";

class Review extends Component {
  state = {
    reviews: null,
  };

  componentDidMount() {
    this.setState({ isLoading: true });

    fetchMovies
      .fetchMovieReviews(this.props.match.params.movieId)
      .then((reviews) => this.setState({ reviews }))
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
    const { reviews, isLoading } = this.state;
    return (
      <>
        {isLoading && <Spinner />}
        {reviews && <Reviews reviews={reviews} />}
      </>
    );
  }
}

export default Review;
