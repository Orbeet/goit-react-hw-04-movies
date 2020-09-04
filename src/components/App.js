import React, { Component, Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "./common/Layout/Layout";
import Spinner from "./common/Spinner/Spinner";
import routes from "../routes";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const HomePage = lazy(() => import("../view/HomePage"));
const MoviesPage = lazy(() => import("../view/MoviesPage"));
const MoviesDetailsPage = lazy(() => import("../view/MoviesDetailsPage"));

class App extends Component {
  state = {
    movies: [],
    isLoading: false,
    error: null,
  };

  render() {
    return (
      <Layout>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route path={routes.home} exact component={HomePage} />
            <Route path={routes.movies} exact component={MoviesPage} />
            <Route path={routes.movieId} component={MoviesDetailsPage} />
            <Redirect to="/" />
          </Switch>
        </Suspense>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
        />
      </Layout>
    );
  }
}

export default App;
