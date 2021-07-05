import {
  Button, FormControl, Input, InputLabel,
} from '@material-ui/core';
import React, { useState } from 'react';
// import { Link, useHistory } from 'react-router-dom';

export default function RegisterForm() {
  const [addUserForm, setAddUserForm] = useState({
    id: 0,
    first_name: '',
    last_name: '',
    email_address: '',
    password: '',
    mobile_number: '',
  });

  const [status, setStatus] = useState('');

  const {
    id, first_name, last_name, email_address, password, mobile_number,
  } = addUserForm;

  //  const history = useHistory();

  async function addUserFormHandler(UserForm) {
    const rawResponse = await fetch('http://localhost:8085/api/v1/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(UserForm),
    });

    const data = await rawResponse.json();
    console.log(data);

    if (data.status === 'ACTIVE') {
      setStatus('Registration Successful. Please Login!');
    } else {
      setStatus('Error , Please try again!');
    }
  }

  function onFormSubmitted(e) {
    e.preventDefault();
    addUserFormHandler(addUserForm);
    setAddUserForm({
      id: 0,
      first_name: '',
      last_name: '',
      email_address: '',
      password: '',
      mobile_number: '',
    });
  }

  function inputChangedHandler(e) {
    const state = addUserForm;
    state[e.target.name] = e.target.value;
    setAddUserForm({ ...state });
  }

  return (
    <div>
      <form className="modalForm" onSubmit={onFormSubmitted}>
        <div>
          <FormControl required>
            <InputLabel htmlFor="firstName">First Name</InputLabel>
            <Input
              id="firstName"
              name="first_name"
              label="First Name"
              type="text"
              onChange={inputChangedHandler}
              value={first_name}
            />
          </FormControl>
          <br />
          <FormControl required>
            <InputLabel htmlFor="last_name">Last Name</InputLabel>
            <Input
              id="last_name"
              name="last_name"
              label="Last Name"
              type="text"
              onChange={inputChangedHandler}
              value={last_name}
            />
          </FormControl>
          <br />
          <FormControl required>
            <InputLabel htmlFor="email_address">Email</InputLabel>
            <Input
              id="email_address"
              name="email_address"
              label="Email"
              type="email"
              onChange={inputChangedHandler}
              value={email_address}
            />
          </FormControl>
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
          <FormControl required>
            <InputLabel htmlFor="mobile_number">Contact Number</InputLabel>
            <Input
              id="mobile_number"
              name="mobile_number"
              label="Contact Number"
              type="text"
              onChange={inputChangedHandler}
              value={mobile_number}
            />
          </FormControl>
          <br />
          <br />
          <span>{status}</span>
          <br />
        </div>
        <Button
          type="submit"
          className="BookButton"
          variant="contained"
          color="primary"
        >
          Register
        </Button>
      </form>
    </div>
  );
}
