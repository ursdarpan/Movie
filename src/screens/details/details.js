import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { ImageList, ImageListItemBar, Typography } from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { makeStyles } from '@material-ui/core/styles';
import './details.css';
import '@fontsource/roboto';
import ImageListItem from '@material-ui/core/ImageListItem';
import IconButton from '@material-ui/core/IconButton';
import yellow from '@material-ui/core/colors/yellow';
import YouTube from 'react-youtube';
import { render } from 'react-dom';
import Header from '../../common/header/Header';

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
  ImageListItem: {
    transform: 'translateZ(0)',
  },
  img: {
    //  maxWidth: '100%',
    maxHeight: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  title: {
    color: theme.palette.primary.contrastText,
  },
  titleBar: {
    background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  fieldName: {
    fontWeight: 'bold',
  },
  fieldValue: {
    fontWeight: 'normal',
    marginLeft: '10px',
  },
  fieldUrl: {
    fontWeight: 'normal',
    flexWrap: 'nowrap',
  },
  divWrap: {
    display: 'flex',
  },
  youtube: {
    marginTop: '16px',
  },
  Artists: {
    fontWeight: 'bold',
    marginTop: '16px',
    marginBottom: '16px',
  },
  starBorder: {
    '&:click .MuiIcon-colorPrimary': {
      borderColor: 'yellow',
    },
  },
}));

export default function Details() {
  const classes = useStyles();
  const params = useParams();
  const [movieDetails, setMovieDetails] = useState(
    {
      id: '',
      title: '',
      storyline: '',
      genres: [
        '',
        '',
      ],
      duration: 0,
      poster_url: '',
      trailer_url: '',
      wiki_url: '',
      release_date: '',
      censor_board_rating: '',
      rating: 0.0,
      status: '',
      artists: [
        {
          id: '',
          first_name: '',
          last_name: '',
          role_type: '',
          profile_description: '',
          profile_url: '',
          wiki_url: '',
        },
      ],
    },
  );

  async function showDetailsHandler() {
    const urlGetMovieDetails = new URL('http://localhost:8085/api/v1/movies/');
    const urlStr = `${urlGetMovieDetails.toString()}${params.id}`;
    const rawResponse = await fetch(`${urlStr}`);
    const data = await rawResponse.json();
    setMovieDetails(data);
  }

  useEffect(() => {
    showDetailsHandler();
  }, [params]);

  // yuo can find all params from here
  console.log(params.id);

  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <Link to="/">
          <Typography>
            <Button className="topButton">
              {'< Back to Home'}
            </Button>
          </Typography>
        </Link>
      </div>
      <div className="root">
        <div className="leftSection">
          <img className="img" src={movieDetails.poster_url} alt={movieDetails.title} />
        </div>
        <div className="middleSection">
          <Typography variant="h6" component="h2" gutterBottom>
            {movieDetails.title}
          </Typography>
          <div className={classes.divWrap}>
            <Typography variant="subtitle1" className={classes.fieldName} gutterBottom>{'Genre: '}</Typography>
            <Typography variant="subtitle1" className={classes.fieldValue} gutterBottom>{movieDetails.genres}</Typography>
          </div>
          <div className={classes.divWrap}>
            <Typography variant="subtitle1" className={classes.fieldName} gutterBottom>{'Duration: '}</Typography>
            <Typography variant="subtitle1" className={classes.fieldValue} gutterBottom>{movieDetails.duration}</Typography>
          </div>
          <div className={classes.divWrap}>
            <Typography variant="subtitle1" className={classes.fieldName} gutterBottom>{'Rating: '}</Typography>
            <Typography variant="subtitle1" className={classes.fieldValue} gutterBottom>{movieDetails.rating}</Typography>
          </div>
          <div className={classes.divWrap}>
            <Typography variant="subtitle1" className={classes.fieldName} gutterBottom>{'Plot: '}</Typography>
            <Typography variant="subtitle1" className={classes.fieldValue} gutterBottom>
              <a href={movieDetails.wiki_url}>(Wiki Link )</a>
              {movieDetails.storyline}
            </Typography>
          </div>
          <div className={classes.divWrap}>
            <Typography variant="subtitle1" className={classes.fieldName} gutterBottom>{'Trailer: '}</Typography>
          </div>
          <div className={classes.youtube}>
            <YouTube videoId={movieDetails.trailer_url} />
          </div>
        </div>
        <div className="rightSection">
          <div>
            <Typography variant="subtitle1" className={classes.fieldName}>Rate this movie:</Typography>
            <br />
            <StarBorderIcon className={classes.starBorder}/>
            <StarBorderIcon />
            <StarBorderIcon />
            <StarBorderIcon />
            <StarBorderIcon />
          </div>
          <div className="artists">
            <Typography variant="subtitle1" className={classes.Artists}>Artists</Typography>
            <div className="artistDetails">
              <div className={classes.root}>
                <ImageList className={classes.gridList} cols={2}>
                  {
                            movieDetails.artists.map((tile) => (
                              <ImageListItem key={tile.id}>
                                <img className={classes.img} src={tile.profile_url} alt={tile.first_name} />
                                <ImageListItemBar
                                  title={`${tile.first_name} ${tile.last_name}`}
                                  classes={{
                                    root: classes.titleBar,
                                    title: classes.title,
                                  }}
                                  actionIcon={(
                                    <IconButton aria-label={`star ${tile.title}`}>
                                      <StarBorderIcon className={classes.title} />
                                    </IconButton>
                                        )}
                                />
                              </ImageListItem>
                            ))
                        }
                </ImageList>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
