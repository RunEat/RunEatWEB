import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { signup } from '../../services/AuthService';
import { useUser } from '../../hooks/userUserContext';

// eslint-disable-next-line no-useless-escape
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

const ProfileForm = () => {
  const { push } = useHistory()

  const { user } = useUser()
  
  const [userEdit, setUser] = useState({
    avatar: 'https://7ab4a7a7b3e97d265133-3c456ba518a2c8c1f13f8ac58cd6a50f.ssl.cf5.rackcdn.com/6mfo16uxpq.jpg',
    username: '',
    password: '',
    email: '',
    height: 150,
    weight: 60,
    age: 16,
	})

	const [errors, setErrors] = useState({
		username: validators.username(),
    password: validators.password(),
    email: validators.email(),
    heigth: validators.height(),
    weight: validators.weight(),
    age: validators.age(),
	})

  useEffect(()=>{
    const ele = document.querySelector('.buble');
    if (ele) {
      ele.style.left = `${Number(age / 4)}px`;
    }
  })

  const [touched, setTouched] = useState({})

  const onSubmit = (e) => {
    e.preventDefault()
    
    console.log(user)
	  signup(userEdit)
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

  const { avatar, username, password, email, height, weight, age } = userEdit
  
  return (
    !user ? ('loading...') : (

    user.avatar ? ('loading...') : (
      <div className="Login mt-4 container d-flex justify-content-center flex-column">
        <h1>Set Up Profile</h1>
          <form className="align-self-center" onSubmit={onSubmit} style={{ maxWidth: 500 }}>
            
          <img src={avatar} alt={user.username} className="ProfileAvatar"></img>
          <small className="EditAvatar" onClick={props.clickToDelete}>&#10060;</small>
          
          <div className="mb-3">
            <p>Username: {user.username}</p>
          {/* <label htmlFor="username" className="form-label">Username </label>
          <input
            className={`form-control ${touched.username && errors.username ? 'is-invalid' : ''}`}
            type="username" id="username" name="username" autoComplete="off"
            value={username} onChange={onChange} onBlur={onBlur} onFocus={onFocus}
          />
          <div className="invalid-feedback">{errors.username}</div> */}
          </div>

          <div className="mb-3">
            <p>Email: {user.email}</p>
          {/* <label htmlFor="email" className="form-label">Email</label>
          <input
            className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
            type="email" id="email" name="email"
            value={email} onChange={onChange} onBlur={onBlur} onFocus={onFocus}
          />
          <div className="invalid-feedback">{errors.email}</div> */}
              

          {/* <label htmlFor="password" className="form-label">Password</label>
          <input
            className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
            type="password" id="password" name="password"
            value={password} onChange={onChange} onBlur={onBlur} onFocus={onFocus}
          />
          <div className="invalid-feedback">{errors.password}</div> */}
            </div>
            
          


          <label for="range23" className="form-label">RANGE AGE</label>
          <input type="range" className="form-range form-control" id="range23"
            id="age" name="age" min={16} max={120}
            value={age} onChange={onChange} onBlur={onBlur} onFocus={onFocus}
          />
            <p>{age}</p>

          <label for="range23" className="form-label">RANGE height</label>
          <input type="range" className="form-range form-control" id="range23"
            id="height" name="height" min={130} max={230}
            value={height} onChange={onChange} onBlur={onBlur} onFocus={onFocus}
          />
            <p>{height}</p>

          <label for="range23" className="form-label">RANGE weight</label>
          <input type="range" className="form-range form-control" id="range23"
            id="weight" name="weight" min={40} max={300}
            value={weight} onChange={onChange} onBlur={onBlur} onFocus={onFocus}
          />
            <p>{weight}</p>

          <button type="submit" className="btn btn-outline-primary">
          Next
          </button>
        </form>
      </div>)
    )
  );
};

export default ProfileForm;