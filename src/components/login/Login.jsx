import React from 'react';
import { useHistory } from 'react-router';
import { login, passwordResetEmail } from '../../services/AuthService';
import { setAccessToken } from '../../store/AccessTokenStore';
import { Link } from 'react-router-dom';
import { useState } from "react";

import { useUser } from '../../hooks/useUserContext';

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
    <div className="Login">
      <Link to='/login-first'><i className="fas fa-chevron-left ms-4 mt-5 mb-5 colorLink"></i></Link>
      <img className="loginIcon me-3" src="data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FwYV8xIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGc+PHBhdGggZD0ibTUwNCAxNzguNzN2MzI1LjI3aC00OTZ2LTMyNS4yN2MxMzkuNjItMTAxLjQ5IDgzLjczLTYwLjY1IDIzOS4wNy0xNzUuNzggMi42NC0xLjk2IDUuNzctMi45NSA4LjkzLTIuOTUgMS41NyAwIDMuMTQuMjQgNC42NS43NC4zOC4xMi43NS4yNiAxLjEyLjQxLjM3LjE2LjczLjMyIDEuMDkuNTEuMzYuMTguNzEuMzggMS4wNS42LjM1LjIxLjY5LjQ0IDEuMDIuNjkgMTUyLjIzIDExMi44IDk2LjU4IDcyLjIzIDIzOS4wNyAxNzUuNzh6IiBmaWxsPSIjZmY3ZDQ3Ii8+PHBhdGggZD0ibTUwNCAxNzguNzN2MzI1LjI3aC0yNDh2LTUwNGMxLjU3IDAgMy4xNC4yNCA0LjY1Ljc0LjM4LjEyLjc1LjI2IDEuMTIuNDEuMzcuMTYuNzMuMzIgMS4wOS41MS4zNi4xOC43MS4zOCAxLjA1LjYuMzUuMjEuNjkuNDQgMS4wMi42OSAxNTIuMjMgMTEyLjggOTYuNTggNzIuMjMgMjM5LjA3IDE3NS43OHoiIGZpbGw9IiNmZjdkNDciLz48cGF0aCBkPSJtMzk5IDE1djM1M2MwIDguMjgtNi43MiAxNS0xNSAxNWgtMjU2Yy04LjI4IDAtMTUtNi43Mi0xNS0xNXYtMzUzYzAtOC4yOCA2LjcyLTE1IDE1LTE1aDI1NmM4LjI4IDAgMTUgNi43MiAxNSAxNXoiIGZpbGw9IiNlZWY0ZmYiLz48cGF0aCBkPSJtMzk5IDE1djM1M2MwIDguMjgtNi43MiAxNS0xNSAxNWgtMTI4di0zODNoMTI4YzguMjggMCAxNSA2LjcyIDE1IDE1eiIgZmlsbD0iI2Q5ZTZmYyIvPjxwYXRoIGQ9Im0yMzIuMTQzIDMzMS45LTIwOC4zLTE1Mi4wMTdjLTQuNTYxLTMuMzI5LTEwLjYwNC0zLjgxNC0xNS42MzktMS4yNTYtNS4wMzMgMi41NTktOC4yMDQgNy43MjctOC4yMDQgMTMuMzczdjMwNWMwIDguMzI2IDYuNzY3IDE1IDE0Ljk5OCAxNSAzLjEzOCAwIDYuMjU3LS45ODMgOC44ODEtMi45MWwyMDguMy0xNTIuOTgzYzguMTQ2LTUuOTg0IDguMTc5LTE4LjIxMS0uMDM2LTI0LjIwN3oiIGZpbGw9IiNmZmUyNzgiLz48cGF0aCBkPSJtNTAzLjc5NiAxNzguNjI4Yy01LjAzMy0yLjU1OS0xMS4wNzctMi4wNzItMTUuNjM5IDEuMjU2bC0yMDguMyAxNTIuMDE2Yy04LjE2NCA1Ljk1OC04LjIzNCAxOC4xODUtLjAzNiAyNC4yMDZsMjA4LjMgMTUyLjk4M2MyLjYyNCAxLjkyNyA1Ljc0MyAyLjkxIDguODgxIDIuOTEgOC4yMzMgMCAxNC45OTgtNi42NzYgMTQuOTk4LTE1di0zMDQuOTk5YzAtNS42NDYtMy4xNzEtMTAuODE0LTguMjA0LTEzLjM3MnoiIGZpbGw9IiNmZmI0NTQiLz48cGF0aCBkPSJtLjc1IDUwMS42N2MyLjAyIDYuMTYgNy43NyAxMC4zMyAxNC4yNSAxMC4zM2g0ODJjNi40OCAwIDEyLjIzLTQuMTcgMTQuMjUtMTAuMzNzLS4xNC0xMi45Mi01LjM3LTE2Ljc2bC0yNDEtMTc3Yy01LjI4LTMuODgtMTIuNDgtMy44OC0xNy43NiAwbC0yNDEgMTc3Yy01LjIzIDMuODQtNy4zOSAxMC42LTUuMzcgMTYuNzZ6IiBmaWxsPSIjZmY5ZDIxIi8+PHBhdGggZD0ibS43NSA1MDEuNjdjMi4wMiA2LjE2IDcuNzcgMTAuMzMgMTQuMjUgMTAuMzNoMjQxdi0yMDdjLTMuMTIgMC02LjI0Ljk3LTguODggMi45MWwtMjQxIDE3N2MtNS4yMyAzLjg0LTcuMzkgMTAuNi01LjM3IDE2Ljc2eiIgZmlsbD0iI2ZmYjQ1NCIvPjwvZz48L3N2Zz4=" alt='LoginIcon'/>
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