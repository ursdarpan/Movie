import React, { useState } from 'react';
import {
  Button, FormControl, Input, InputLabel, FormHelperText,
} from '@material-ui/core';

export default function LoginForm() {
  const [LoginForm, setLoginForm] = useState({
    id: 0,
    login: '',
    password: '',
  });
  return (
    <div>
      <form className="modalForm">
        <div>
          <FormControl className="formControl">
            <InputLabel htmlFor="login" required>Login</InputLabel>
            <Input id="login" />
          </FormControl>
          <br />
          <br />
          <FormControl className="formControl">
            <InputLabel htmlFor="password" required>Password</InputLabel>
            <Input id="password" />
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
      </form>
    </div>
  );
}
