import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 'auto',
    height: 450,
  },
  img: {
    maxWidth: '100%',
    maxHeight: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  poster: {
    cursor: 'pointer',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

// eslint-disable-next-line react/prop-types
export default function ReleasedMovieGridList() {
  const classes = useStyles();

  const [releasedMovieList, setReleasedMovieList] = useState([]);
  const releasedmovies = useSelector((state) => state.releasedmovies.movies);
  useEffect(() => {
    if (releasedmovies && releasedmovies.length) {
      setReleasedMovieList(releasedmovies);
    }
  }, [releasedmovies]);

  return (
    <div className={classes.root}>
      <ImageList rowHeight={350} cols={4} className={classes.gridList}>
        <ImageListItem key="Subheader" style={{ height: 'auto' }}>
          <ListSubheader component="div" />
        </ImageListItem>
        {releasedMovieList.map((tile) => (
          <ImageListItem className={classes.poster} key={tile.id}>
            <Link to={{
              pathname: `/details/${tile.id}`,
            }}
            >
              {/* eslint-disable-next-line max-len */}
              <img className={classes.img} src={tile.poster_url} alt={tile.title} />
            </Link>
            <ImageListItemBar
              title={tile.title}
              subtitle={(
                <span>
                  Release Date :
                  {tile.release_date}
                </span>
)}
              actionIcon={(
                <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
                  <InfoIcon />
                </IconButton>
                              )}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
