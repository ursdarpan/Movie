/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';
import './Home.css';
import { useSelector } from 'react-redux';
import Header from '../../common/header/Header';
import UpcomingMovieGridList from './HorizontalGrid';
import ReleasedMovieGridList from './ReleasedMovieGrid';
import FilterCard from './FilterCard';

export default function HomePage() {
  const [upcomingMovieList, setUpcomingMovieList] = useState([]);
  const upcomingmovies = useSelector((state) => state.movies);
  useEffect(() => {
    if (upcomingmovies && upcomingmovies.length) {
      setUpcomingMovieList(upcomingmovies);
    }
  }, [upcomingmovies]);

  const [genreList, setGenreList] = useState([]);
  const genres = useSelector((state) => state.genres);
  useEffect(() => {
    if (genres && genres.length) {
      setGenreList(genres);
    }
  }, [genres]);

  const [artistList, setArtistList] = useState([]);
  const artists = useSelector((state) => state.artists);
  useEffect(() => {
    if (artists && artists.length) {
      setArtistList(artists);
    }
  }, [artists]);

  return (
    <div>
      <div>
        <Header buttonName="LOGIN" />
      </div>
      <div className="headName">
        Upcoming Movies
      </div>
      <div className="UpcomingSection">
        <UpcomingMovieGridList mlist={upcomingMovieList} />
      </div>
      <div className="releaseSection">
        <div className="releaseGrid">
          <ReleasedMovieGridList />
        </div>
        <div className="filterSection">
          <FilterCard genres={genreList} artists={artistList} />
        </div>
      </div>
    </div>
  );
}
