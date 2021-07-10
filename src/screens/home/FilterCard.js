/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {
  CardActions, Input, InputLabel, FormControl, MenuItem, Checkbox, ListItemText, TextField,
} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start  space-around',
    alignItems: 'flex-start',
  },
  content: {
    margin: theme.spacing(1),
    minWidth: '240px',
    maxWidth: '240px',
  },
  formCtl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  menuPaper: {
    maxHeight: 200,
  },
  head: {
    color: theme.palette.primary.light,
    textTransform: 'uppercase',
  },
  textField: {
    margin: theme.spacing(1),
    minWidth: '240px',
    maxWidth: '240px',
  },
  applyButton: {
    margin: theme.spacing(1),
    minWidth: '240px',
    maxWidth: '240px',
    textTransform: 'uppercase',

  },
}));

const ITEM_HEIGHT = 30;
const ITEM_PADDING_TOP = 4;
const MenuProps = {
  PaperProps: {
    variant: 'outlined',
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function FilterCard({ genres, artists }) {
  const classes = useStyles();
  const [genreName, setGenreName] = useState([]);
  const [artistName, setArtistName] = useState([]);
  const [movieName, setMovieName] = useState('');
  const [releaseStartDate, setReleaseStartDate] = useState('');
  const [releaseEndDate, setReleaseEndDate] = useState('');
  const dispatch = useDispatch();
  const url = new URL('http://localhost:8085/api/v1/movies?page=1&limit=10');
  const params = new URLSearchParams(url.search.slice(1));

  const handleGenreChange = (event) => {
    setGenreName(event.target.value);
  };

  const handleArtistChange = (event) => {
    setArtistName(event.target.value);
  };

  function movieChangedHandler(event) {
    setMovieName(event.target.value);
  }

  function releaseStartDateHandler(event) {
    setReleaseStartDate(event.target.value);
  }

  function releaseEndDateHandler(event) {
    setReleaseEndDate(event.target.value);
  }

  // On form submit , we set the filters

  function onFormSubmitted(e) {
    e.preventDefault();
    if (movieName.length) params.append('movieName', movieName);
    if (genreName.length) params.append('genre', genreName.join());
    if (artistName.length) params.append('artistName', artistName.join());
    if (releaseStartDate.length) params.append('releaseStartDate', releaseStartDate);
    if (releaseEndDate.length) params.append('releaseEndDate', releaseEndDate);
    const paramStr = params.toString();
    dispatch({ type: 'SET_FILTERS', payload: paramStr });
    // filteredMovieList();
  }

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <div className={classes.head}>
          FIND MOVIES BY:
        </div>
        <form id="filterControl" onSubmit={onFormSubmitted}>
          <FormControl className={classes.formCtl}>
            <InputLabel htmlFor="movieName">Movie Name</InputLabel>
            <Input
              id="movieName"
              name="movieName"
              value={movieName}
              label="movieName"
              type="text"
              placeholder="Movie Name"
              className={classes.content}
              onChange={movieChangedHandler}
            />
          </FormControl>
          <br />
          <FormControl className={classes.formCtl}>
            <InputLabel id="mutiple-checkbox-label">Genres</InputLabel>
            <Select
              labelId="mutiple-checkbox-label"
              id="mutiple-checkbox"
              multiple
              value={genreName}
              onChange={handleGenreChange}
              input={<Input />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
              placeholder="Genres"
              className={classes.content}
            >
              {genres.map((name) => (
                <MenuItem key={name.genre} value={name.genre}>
                  <Checkbox checked={genreName.indexOf(name.genre) > -1} />
                  <ListItemText primary={name.genre} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <FormControl className={classes.formCtl}>
            <InputLabel id="artists">Artist</InputLabel>
            <Select
              labelId="artists"
              id="artists"
              multiple
              value={artistName}
              onChange={handleArtistChange}
              input={<Input />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
              placeholder="Artists"
              className={classes.content}
            >
              {artists.map((name) => (
                <MenuItem key={name.id} value={name.first_name}>
                  <Checkbox checked={artistName.indexOf(name.first_name) > -1} />
                  <ListItemText primary={`${name.first_name}   ${name.last_name}`} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <FormControl className={classes.formCtl}>
            <TextField
              id="releaseDateStart"
              label="Release Date Start"
              type="date"
        //      defaultValue="dd-mm-yyyy"
              value={releaseStartDate}
              onChange={releaseStartDateHandler}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
          <br />
          <FormControl className={classes.formCtl}>
            <TextField
              id="releaseDateEnd"
              label="Release End Date"
              type="date"
        //      defaultValue="dd-mm-yyyy"
              onChange={releaseEndDateHandler}
              value={releaseEndDate}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
          <br />
          <CardActions>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.applyButton}
            >
              Submit
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
}
