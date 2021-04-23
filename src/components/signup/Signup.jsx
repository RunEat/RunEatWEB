import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { signup } from '../../services/AuthService';

const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

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
  },
  email: value => {
    let message

    if (!value) {
      message = 'Email is required'
    } else if (!EMAIL_PATTERN.test(value)) {
      message = 'Email is invalid'
    }

    return message
  },
  height: value => {
    let message

    if (!value) {
      message = 'Height is required'
    } else if (value && value < 130 || value > 230) {
      message = 'Height should be a number in cm between 130 and 230. E.g.: 172'
    }

    return message
  },
  weight: value => {
    let message

    if (!value) {
      message = 'Weight is required'
    } else if (value && value < 40 || value > 300) {
      message = 'Weight should be a number between 40 and 300'
    }

    return message
  },
  age: value => {
    let message

    if (!value) {
      message = 'Age is required'
    } else if (value && value < 16 || value > 120) {
      message = 'You must be at least 16 years old'
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
    height: '',
    weight: '',
    age: '',
	})

	const [errors, setErrors] = useState({
		username: validators.username(),
    password: validators.password(),
    email: validators.email(),
    heigth: validators.height(),
    weight: validators.weight(),
    age: validators.age(),
	})

  const [touched, setTouched] = useState({})


  const onSubmit = (e) => {
    e.preventDefault()
    
    console.log(user)
	  signup(user)
	  	.then(() => push('/checkEmail'))
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

  const { username, password, email, height, weight, age} = user
  
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
        
        <div className="mb-3">
				<label htmlFor="email" className="form-label">Email</label>
				<input
					className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
					type="email" id="email" name="email"
					value={email} onChange={onChange} onBlur={onBlur} onFocus={onFocus}
				/>
				 <div className="invalid-feedback">{errors.email}</div>
        </div>
        
        <div className="mb-3">
				<label htmlFor="height" className="form-label">Height</label>
				<input
					className={`form-control ${touched.height && errors.height ? 'is-invalid' : ''}`}
					type="number" id="height" name="height" min={130} max={230}
					value={height} onChange={onChange} onBlur={onBlur} onFocus={onFocus}
				/>
				 <div className="invalid-feedback">{errors.height}</div>
        </div>
        
        <div className="mb-3">
				<label htmlFor="weight" className="form-label">Weight</label>
				<input
					className={`form-control ${touched.weight && errors.weight ? 'is-invalid' : ''}`}
					type="number" id="weight" name="weight" min={40} max={300}
					value={weight} onChange={onChange} onBlur={onBlur} onFocus={onFocus}
				/>
				 <div className="invalid-feedback">{errors.weight}</div>
        </div> 

        <div className="mb-3">
				<label htmlFor="age" className="form-label">Age</label>
				<input
					className={`form-control ${touched.age && errors.age ? 'is-invalid' : ''}`}
					type="number" id="age" name="age" min={16} max={120}
					value={age} onChange={onChange} onBlur={onBlur} onFocus={onFocus}
				/>
				 <div className="invalid-feedback">{errors.age}</div>
        </div> 

				<button type="submit" className="btn btn-outline-primary">
				Submit
				</button>
			</form>
    </div>
  );
};

export default Signup;