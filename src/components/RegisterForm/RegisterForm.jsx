import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        first_name: firstName,
        last_name: lastName,
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <div>
      <div class="mb-3 w-25">
        <form class="mb-3 col-md" onSubmit={registerUser}>
          <h2>Register User</h2>
          {errors.registrationMessage && (
            <h3 className="alert" role="alert">
              {errors.registrationMessage}
            </h3>
          )}
          <div class="form-floating">
            <input
              type="text"
              name="first_name"
              id="first_name"
              class="form-control"
              placeholder="First Name"
              value={firstName}
              required
              onChange={(event) => setFirstName(event.target.value)}
            />
            <label for="first_name">First Name</label>
          </div>
          <div class="form-floating">
            <input
              type="text"
              name="last_name"
              id="last_name"
              class="form-control"
              placeholder="Last Name"
              value={lastName}
              required
              onChange={(event) => setLastName(event.target.value)}
            />
            <label for="last_name">Last Name</label>
          </div>
          <div class="form-floating">
            <input
              type="text"
              name="username"
              id="username"
              class="form-control"
              placeholder="username"
              value={username}
              required
              onChange={(event) => setUsername(event.target.value)}
            />
            <label for="username">Username</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              name="password"
              id="password"
              class="form-control"
              placeholder="password"
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}
            />
            <label for="password">Password</label>
          </div>
          <div>
            <input className="btn btn-primary m-3" type="submit" name="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
