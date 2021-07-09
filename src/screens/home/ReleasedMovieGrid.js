import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { useSelector } from 'react-redux';

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
  poster: {
    cursor: 'pointer',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

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
      <GridList cellHeight={350} cols={4} className={classes.gridList}>
        <GridListTile key="Subheader" style={{ height: 'auto' }}>
          <ListSubheader component="div" />
        </GridListTile>
        {releasedMovieList.map((tile) => (
          <GridListTile className={classes.poster} key={tile.id}>
            <img src={tile.poster_url} alt={tile.title} />
            <GridListTileBar
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
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
