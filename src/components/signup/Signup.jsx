import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { signup } from '../../services/AuthService';

const cities = 'Madrid' || 'Barcelona' || 'Miami' || 'Paris' || 'Berlin' || 'Amsterdam' || 'México' || 'Sao Paulo' || 'Lisbon'

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

const Signup = () => {

  const { push } = useHistory()
  
  const [user, setUser] = useState({
    username: '',
    password: '',
    email: '',
    heigth: '',
    weight: '',
    age: '',
	})

	const [errors, setErrors] = useState({
		username: validators.username(),
		password: validators.password(),
	})

  const [touched, setTouched] = useState({})


  const onSubmit = (e) => {
    e.preventDefault()
    
    console.log(user)
	  signup(user)
	  	.then(() => push('/login'))
  }

  const onChange = (e) => {
    const { name, value } = e.target

    setUser((prevState) => ({
          ...prevState,
          [name]: value
    }))
    
    setErrors((prevState) => ({
          ...prevState,
          [name]: validators[name] && validators[name](value)
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

  const { username, password } = user
  
	return (
		<div className="Login mt-4 container d-flex justify-content-center flex-column">
		<h1>Sign up</h1>
			<form className="align-self-center" onSubmit={onSubmit} style={{ maxWidth: 500 }}>
				<div className="mb-3">
				<label htmlFor="username" className="form-label">Username </label>
				<input
					className={`form-control ${touched.username && errors.username ? 'is-invalid' : ''}`}
					type="username" id="username" name="username" autoComplete="off"
					value={username} onChange={onChange} onBlur={onBlur} onFocus={onFocus}
				/>
				<div className="invalid-feedback">{errors.username}</div>
				</div>

				<div className="mb-3">
				<label htmlFor="password" className="form-label">Password</label>
				<input
					className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
					type="password" id="password" name="password"
					value={password} onChange={onChange} onBlur={onBlur} onFocus={onFocus}
				/>
				 <div className="invalid-feedback">{errors.password}</div>
        </div> 

				<button type="submit" className="btn btn-outline-primary">
				Submit
				</button>
			</form>
    </div>
  );
};

export default Signup;