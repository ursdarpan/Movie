import React, {
  useEffect,
} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import HomePage from './home/Home';

export default function Controller() {
  const dispatch = useDispatch();

  // Upcoming movie logic
  const urlGetMovies = new URL('http://localhost:8085/api/v1/movies?status=PUBLISHED');
  const UpcomingMovieParams = new URLSearchParams(urlGetMovies.search.slice(1));
  async function loadUpcomingMovies() {
    UpcomingMovieParams.append('status', 'PUBLISHED');
    const rawResponse = await fetch(urlGetMovies);
    const upcomingMovies = await rawResponse.json();
    setTimeout(() => {
      dispatch({ type: 'SET_UPCOMING_MOVIES', payload: upcomingMovies });
    }, 1);
  }

  useEffect(() => {
    loadUpcomingMovies();
  }, []);

  /// Getting the filters set by FilterCard.js
  const filterParams = useSelector((state) => state.paramStr);
  /// / Released movie logic
  const urlRelMovies = new URL('http://localhost:8085/api/v1/movies?status=RELEASED');
  async function loadReleasedMovies() {
    const urlStr = `${urlRelMovies.toString()}&${filterParams}`;
    const rawResponse = await fetch(`${urlStr}`);
    const relMovies = await rawResponse.json();
    setTimeout(() => {
      dispatch({ type: 'SET_RELEASED_MOVIES', payload: relMovies });
    }, 1);
  }

  useEffect(() => {
    loadReleasedMovies();
  }, [filterParams]);
  // useEffect(() => {
  //   loadReleasedMovies();
  // }, []);

  async function loadGenres() {
    const rawResponse = await fetch('http://localhost:8085/api/v1/genres');
    const data = await rawResponse.json();
    setTimeout(() => {
      dispatch({ type: 'SET_GENRES', payload: data });
    }, 1);
  }

  useEffect(() => {
    loadGenres();
  }, []);

  async function loadArtists() {
    const rawResponse = await fetch('http://localhost:8085/api/v1/artists');
    const data = await rawResponse.json();
    setTimeout(() => {
      dispatch({ type: 'SET_ARTISTS', payload: data });
    }, 1);
  }

  useEffect(() => {
    loadArtists();
  }, []);

  return (
  // eslint-disable-next-line react/jsx-filename-extension
    <div>
      <Router>
        <div>
          <Route
            exact
            path="/"
            render={(props) => (
              <HomePage />
            )}
          />
        </div>
      </Router>
    </div>
  );
}
