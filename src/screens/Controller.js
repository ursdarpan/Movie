import React, {
  Component,
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import HomePage from './home/Home';

export default function Controller() {
  return (
    <Fragment>
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
    </Fragment>
  );
}
