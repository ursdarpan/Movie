import { createStore } from 'redux';

const initialState = {
  movies: [],
  releasedmovies: [],
  paramStr: '',
};

function moviesReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_UPCOMING_MOVIES':
      Object.assign(state, action.payload);
      return { ...state };
    case 'SET_RELEASED_MOVIES':
      Object.assign(state.releasedmovies, action.payload);
      return { ...state };
    case 'SET_GENRES':
      Object.assign(state, action.payload);
      return { ...state };
    case 'SET_ARTISTS':
      Object.assign(state, action.payload);
      return { ...state };
    case 'SET_FILTERS':
      return { ...state, paramStr: action.payload };
    default:
      return state;
  }
}

export default createStore(moviesReducer);
