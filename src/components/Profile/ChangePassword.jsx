import React from 'react';
import { useHistory } from "react-router-dom"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { passwordReset, updatePassword } from "../../services/AuthService";

const validators = {
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

const ChangePassword = () => {
    const { token } = useParams();
    const { push } = useHistory()


    const [user, setUser] = useState({
        password: ''
    });
    
    const [errors, setErrors] = useState({
        password: validators.password(),
	})

    useEffect(() => {
        passwordReset(token)
          .then(user => setUser(user))
    }, [token])
    

    const [touched, setTouched] = useState({})

    const onSubmit = (e) => {
        e.preventDefault()
    
        console.log(user)
        updatePassword(user)
          .then(() => push('/user/login'))
    }

    const onChange = (e) => {
        const { value } = e.target

        setUser((prevState) => ({
            ...prevState,
            password: e.target.value
        }))
        
        setErrors((prevState) => ({
            ...prevState,
            password: validators.password && validators.password(value)
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

    const {password} = user
        
    return !user ? (
      "loading"
    ) : (
      <div className="ChangePassword d-flex flex-column align-items-center mt-5">
        <i class="fas fa-lock mt-5 mb-5 fs-1"></i>
        <form
          className="d-flex flex-column align-items-center"
          onSubmit={onSubmit}
          style={{ maxWidth: 500 }}
        >
          <label htmlFor="password" className="form-label">
            Enter your new password:
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

          <button
            type="submit"
            className="btn mt-4 w-75"
            style={{
              "border-radius": "5rem",
              color: "#fff",
              backgroundColor: "#00bd56",
            }}
          >
            Update password
          </button>
        </form>
      </div>
    );
};

export default ChangePassword;