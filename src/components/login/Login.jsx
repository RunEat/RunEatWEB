import React from 'react';
import { useHistory } from 'react-router';
import { login, passwordResetEmail } from '../../services/AuthService';
import { setAccessToken } from '../../store/AccessTokenStore';
import { Link } from 'react-router-dom';
import { useState } from "react";
import './Login.css'

import { useUser } from '../../hooks/useUserContext';

const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const validators = {
  username: value => {
    let message

    if (!value) {
      message = 'Username is required'
    } else if (value && value.length < 4) {
      message = 'Username is invalid'
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
  },
  email: value => {
    let message

    if (!value) {
      message = 'Email is required'
    } else if (!EMAIL_PATTERN.test(value)) {
      message = 'Email is invalid'
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
      password: '',
      email: '',
    },
    errors: {
      username: validators.username(),
      password: validators.password(),
      email: validators.email()
    }
  })

  const [touched, setTouched] = useState({})
  const [errorLogin, setErrorLogin] = useState()
  const [show, setShow] = useState(false)

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
        .catch((errors) => {
          console.log('errors', errors.response.data.errors.username)
          setErrorLogin(errors.response.data.errors.username);
          console.log("errorLogin", errorLogin);
          setShow(true)
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
    console.log('change password', e.target)

    if (isValid()) {
      passwordResetEmail()
        .then(() => {
          console.log('Check your email')
        })
        .catch((errors) => {
          console.log('errors', errors.response.data.errors.email)
          setErrorLogin(errors.response.data.errors.email);
          //setShow(true)
        })
    }
      
  };

  const passwordRecovery = (e) => {
    e.preventDefault();

    show === false ? setShow(true) : setShow(false);
  }

  const { username, password, email } = state.fields
  const { errors } = state

  return (
    <div className="Login d-flex flex-column">
      <Link to="/login-first">
        <i className="fas fa-chevron-left ms-4 mt-5 mb-5 colorLink"></i>
      </Link>
      <div className="d-flex flex-column justify-content-between align-items-center text-center">
        <img
          className="mb-5 w-25"
          src="data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FwYV8xIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGc+PHBhdGggZD0ibTUwNCAxNzguNzN2MzI1LjI3aC00OTZ2LTMyNS4yN2MxMzkuNjItMTAxLjQ5IDgzLjczLTYwLjY1IDIzOS4wNy0xNzUuNzggMi42NC0xLjk2IDUuNzctMi45NSA4LjkzLTIuOTUgMS41NyAwIDMuMTQuMjQgNC42NS43NC4zOC4xMi43NS4yNiAxLjEyLjQxLjM3LjE2LjczLjMyIDEuMDkuNTEuMzYuMTguNzEuMzggMS4wNS42LjM1LjIxLjY5LjQ0IDEuMDIuNjkgMTUyLjIzIDExMi44IDk2LjU4IDcyLjIzIDIzOS4wNyAxNzUuNzh6IiBmaWxsPSIjZmY3ZDQ3Ii8+PHBhdGggZD0ibTUwNCAxNzguNzN2MzI1LjI3aC0yNDh2LTUwNGMxLjU3IDAgMy4xNC4yNCA0LjY1Ljc0LjM4LjEyLjc1LjI2IDEuMTIuNDEuMzcuMTYuNzMuMzIgMS4wOS41MS4zNi4xOC43MS4zOCAxLjA1LjYuMzUuMjEuNjkuNDQgMS4wMi42OSAxNTIuMjMgMTEyLjggOTYuNTggNzIuMjMgMjM5LjA3IDE3NS43OHoiIGZpbGw9IiNmZjdkNDciLz48cGF0aCBkPSJtMzk5IDE1djM1M2MwIDguMjgtNi43MiAxNS0xNSAxNWgtMjU2Yy04LjI4IDAtMTUtNi43Mi0xNS0xNXYtMzUzYzAtOC4yOCA2LjcyLTE1IDE1LTE1aDI1NmM4LjI4IDAgMTUgNi43MiAxNSAxNXoiIGZpbGw9IiNlZWY0ZmYiLz48cGF0aCBkPSJtMzk5IDE1djM1M2MwIDguMjgtNi43MiAxNS0xNSAxNWgtMTI4di0zODNoMTI4YzguMjggMCAxNSA2LjcyIDE1IDE1eiIgZmlsbD0iI2Q5ZTZmYyIvPjxwYXRoIGQ9Im0yMzIuMTQzIDMzMS45LTIwOC4zLTE1Mi4wMTdjLTQuNTYxLTMuMzI5LTEwLjYwNC0zLjgxNC0xNS42MzktMS4yNTYtNS4wMzMgMi41NTktOC4yMDQgNy43MjctOC4yMDQgMTMuMzczdjMwNWMwIDguMzI2IDYuNzY3IDE1IDE0Ljk5OCAxNSAzLjEzOCAwIDYuMjU3LS45ODMgOC44ODEtMi45MWwyMDguMy0xNTIuOTgzYzguMTQ2LTUuOTg0IDguMTc5LTE4LjIxMS0uMDM2LTI0LjIwN3oiIGZpbGw9IiNmZmUyNzgiLz48cGF0aCBkPSJtNTAzLjc5NiAxNzguNjI4Yy01LjAzMy0yLjU1OS0xMS4wNzctMi4wNzItMTUuNjM5IDEuMjU2bC0yMDguMyAxNTIuMDE2Yy04LjE2NCA1Ljk1OC04LjIzNCAxOC4xODUtLjAzNiAyNC4yMDZsMjA4LjMgMTUyLjk4M2MyLjYyNCAxLjkyNyA1Ljc0MyAyLjkxIDguODgxIDIuOTEgOC4yMzMgMCAxNC45OTgtNi42NzYgMTQuOTk4LTE1di0zMDQuOTk5YzAtNS42NDYtMy4xNzEtMTAuODE0LTguMjA0LTEzLjM3MnoiIGZpbGw9IiNmZmI0NTQiLz48cGF0aCBkPSJtLjc1IDUwMS42N2MyLjAyIDYuMTYgNy43NyAxMC4zMyAxNC4yNSAxMC4zM2g0ODJjNi40OCAwIDEyLjIzLTQuMTcgMTQuMjUtMTAuMzNzLS4xNC0xMi45Mi01LjM3LTE2Ljc2bC0yNDEtMTc3Yy01LjI4LTMuODgtMTIuNDgtMy44OC0xNy43NiAwbC0yNDEgMTc3Yy01LjIzIDMuODQtNy4zOSAxMC42LTUuMzcgMTYuNzZ6IiBmaWxsPSIjZmY5ZDIxIi8+PHBhdGggZD0ibS43NSA1MDEuNjdjMi4wMiA2LjE2IDcuNzcgMTAuMzMgMTQuMjUgMTAuMzNoMjQxdi0yMDdjLTMuMTIgMC02LjI0Ljk3LTguODggMi45MWwtMjQxIDE3N2MtNS4yMyAzLjg0LTcuMzkgMTAuNi01LjM3IDE2Ljc2eiIgZmlsbD0iI2ZmYjQ1NCIvPjwvZz48L3N2Zz4="
          alt="LoginIcon"
        />
        <form onSubmit={onSubmit} style={{ maxWidth: 500 }}>
          {
            !show &&
            <div className="mb-5">
            <input
              style={{
                border: "none",
                borderBottom: "1px solid #00bd56",
                borderRadius: "0px",
              }}
              className={`form-control w-100 ${
                touched.username && errors.username ? "is-invalid" : ""
              }`}
              type="text"
              id="username"
              name="username"
              autoComplete="off"
              value={username}
              onChange={onChange}
              onBlur={onBlur}
              onFocus={onFocus}
              placeholder="Username"
            />
            <div className="invalid-feedback">{errors.username}</div>
            </div>
          }

          {
            !show &&
            <div className="mb-4">
            <input
              style={{
                border: "none",
                borderBottom: "1px solid #00bd56",
                borderRadius: "0px",
              }}
              className={`w-100 form-control ${
                touched.password && errors.password ? "is-invalid" : ""
              }`}
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              onBlur={onBlur}
              onFocus={onFocus}
              placeholder="Password"
            />
            <div className="invalid-feedback">{errors.password}</div>
            </div>
          }

          <div className="d-grid gap-2 col-8 mx-auto mb-5 w-100">
            <button
              className="border-0 bg-transparent"
              style={{ color: "#757e85", fontSize: ".7rem" }}
              onClick={passwordRecovery}
            >
              {!show ? 'GET NEW PASSWORD?' : 'BACK TO LOGIN'}
            </button>
            {
              show &&
              <>
              <input
                style={{
                  border: "none",
                  borderBottom: "1px solid #00bd56",
                  borderRadius: "0px",
                }}
                className={`form-control mt-5 w-100 ${
                  touched.email && errors.email ? "is-invalid" : ""
                }`}
                type="email"
                id="email"
                name="email"
                autoComplete="off"
                value={email}
                onClick={changePassword}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                placeholder="Write your signup email"
              />
              <div className="invalid-feedback">{errors.email}</div>
              <button
                type="submit"
                className="btn btn-warning mt-3 text-light passwordRecovery colorLink w-100"
                style={{
                  borderRadius: "5rem",
                }}
                disabled={!isValid()}
              >
                Recover password
              </button>
              </>
            }
          </div>
          
          {
            !show &&
          <button
            type="submit"
            className="mt-5 btn LoginButton colorLink w-75"
            style={{
              borderRadius: "5rem",
              color: "#fff",
              backgroundColor: "#00bd56",
            }}
            disabled={!isValid()}
          >
            LOG IN
          </button>
          }
        </form>
      </div>
      {errorLogin && show && (
        <div className="d-flex justify-content-center mt-3 text-danger">
          <p>
            <small>{errorLogin}</small>
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;