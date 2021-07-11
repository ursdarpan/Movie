import React, { useEffect, useState } from 'react';
import {
  Button, FormControl, Input, InputLabel,
} from '@material-ui/core';
import './LoginComp.css';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';

export default function LoginForm() {
  const [loginForm, setLoginForm] = useState({
    login: '',
    password: '',
  });
  const {
    login, password,
  } = loginForm;
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [loginStatus, setStatus] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();

  async function performAuthentication() {
    const paramCreds = window.btoa(`${login}:${password}`);
    const url = 'http://localhost:8085/api/v1/auth/login';
    try {
      const rawResponse = await fetch(url,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            authorization: `Basic ${paramCreds}`,
          },
        });
      const result = await rawResponse.json();
      if (rawResponse.ok) {
        console.log('hello');
        userHasAuthenticated(true);
        setStatus('Login Successful');
        localStorage.setItem('result', JSON.stringify(result));
        localStorage.setItem('access-token', rawResponse.headers.get('access-token'));
        setTimeout(() => {
          dispatch({ type: 'SET_USER_LOGGED_IN', payload: isAuthenticated });
        }, 1);
        //     history.push('/');
      }
    } catch (e) {
      setStatus(`Login failed ${e.message}`);
    }
  }

  function onFormSubmitted(e) {
    e.preventDefault();
    performAuthentication();
  }

  function inputChangedHandler(e) {
    const state = loginForm;
    state[e.target.name] = e.target.value;
    setLoginForm({ ...state });
  }
  return (
    <div>
      <form className="loginForm" onSubmit={onFormSubmitted}>
        <div>
          <FormControl required>
            <InputLabel htmlFor="login">Login</InputLabel>
            <Input
              id="login"
              name="login"
              label="Login"
              type="text"
              onChange={inputChangedHandler}
              value={login}
            />
          </FormControl>
          <br />
          <br />
          <FormControl required>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              name="password"
              label="Password"
              type="password"
              onChange={inputChangedHandler}
              value={password}
            />
          </FormControl>
          <br />
          <br />
        </div>
        <Button
          type="submit"
          className="modalButton"
          variant="contained"
          color="primary"
        >
          LOGIN
        </Button>
        <br />
        <span>{loginStatus}</span>
      </form>
    </div>
  );
}
