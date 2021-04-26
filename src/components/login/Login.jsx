import React from 'react';
import { useHistory } from 'react-router';
import { login, passwordResetEmail } from '../../services/AuthService';
import { setAccessToken } from '../../store/AccessTokenStore';
import { useState } from "react";

import { useUser } from '../../hooks/userUserContext';

const validators = {
  username: value => {
    let message

    if (!value) {
      message = 'username is required'
    } else if (value && value.length < 4) {
      message = 'username is invalid'
    }

    return message
  },
  password: value => {
    let message

    if (!value) {
      message = 'Password is required'
    } else if (value && value.length < 8) {
      message = 'Password must have 8 character or more'
    }

    return message
  }
}

const Login = () => {
  const { push } = useHistory()
  const { getUser: doLogin } = useUser();

  const [state, setState] = useState({
    fields: {
      username: '',
      password: ''
    },
    errors: {
      username: validators.username(),
      password: validators.password()
    }
  })

  const [touched, setTouched] = useState({})

  const isValid = () => {
    const { errors } = state;
    return !Object.keys(errors).some(error => errors[error]);
  }

  const onSubmit = (e) => {
    const { fields } = state
	  e.preventDefault()
	  
    if (isValid()) {
      login(fields)
        .then(response => {
          setAccessToken(response.access_token)
          doLogin()
            .then(() => push('/profile'))
        })
    }
  }

  const onChange = (e) => {
    const { name, value } = e.target

    setState((prevState) => ({
      fields: {
        ...prevState.fields,
        [name]: value
      },
      errors: {
        ...prevState.errors,
        [name]: validators[name] && validators[name](value)
      }
    }))
  }

  const onBlur = (e) => {
    const { name } = e.target

    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true
    }))
  }

  const onFocus = (e) => {
    const { name } = e.target

    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: false
    }))
  }

  const changePassword = (e) => {
    e.preventDefault();

    passwordResetEmail().then(() => {
      console.log("Revisa tu email");
    });
  };

  const { username, password } = state.fields
  const { errors } = state

  return (
    <div className="Login mt-4 container d-flex justify-content-center">
      <h1>Log in</h1>
      <form onSubmit={onSubmit} style={{ maxWidth: 500 }}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username{" "}
          </label>
          <input
            className={`form-control ${
              touched.username && errors.username ? "is-invalid" : ""
            }`}
            type="username"
            id="username"
            name="username"
            autoComplete="off"
            value={username}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
          />
          <div className="invalid-feedback">{errors.username}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            className={`form-control ${
              touched.password && errors.password ? "is-invalid" : ""
            }`}
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
          />
          <div className="invalid-feedback">{errors.password}</div>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary"
          disabled={!isValid()}
        >
          Submit
        </button>
      </form>

      <div className="d-grid gap-2 col-8 mx-auto mt-3">
        <button className="btn btn-danger" onClick={changePassword}>
          Forgot my password
        </button>
      </div>
    </div>
  );
};

export default Login;