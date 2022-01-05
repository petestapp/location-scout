import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <div class="mb-3 w-25">
      <form class="mb-3 col-md" onSubmit={login}>
        <h2>Login</h2>
        {errors.loginMessage && (
          <h3 className="alert" role="alert">
            {errors.loginMessage}
          </h3>
        )}
        <div class="form-floating">
          <input
            type="text"
            name="username"
            id="username"
            class="form-control"
            placeholder="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <label for="username" class="form-label">
            username
          </label>
        </div>
        <div class="form-floating">
          <input
            type="password"
            name="password"
            id="password"
            class="form-control"
            placeholder="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <label htmlFor="password" class="form-label">
            password
          </label>
        </div>
        <div>
          <input className="btn btn-primary m-3" type="submit" name="submit" value="Log In" />
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
