import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { signup } from '../../services/AuthService';
import { useUser } from '../../hooks/userUserContext';
import { editUser } from '../../services/UserService';

// eslint-disable-next-line no-useless-escape
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const validators = {
  // username: value => {
  //   let message

  //   if (!value) {
  //     message = 'username is required'
  //   } else if (value && value.length < 4) {
  //     message = 'username is invalid'
  //   }

  //   return message
  // },
  // password: value => {
  //   let message

  //   if (!value) {
  //     message = 'Password is required'
  //   } else if (value && value.length < 8) {
  //     message = 'Password must have 8 character or more'
  //   }

  //   return message
  // },
  // email: value => {
  //   let message

  //   if (!value) {
  //     message = 'Email is required'
  //   } else if (!EMAIL_PATTERN.test(value)) {
  //     message = 'Email is invalid'
  //   }

  //   return message
  // },
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
  
  const [userToEdit, setUser] = useState({
    avatar: 'https://7ab4a7a7b3e97d265133-3c456ba518a2c8c1f13f8ac58cd6a50f.ssl.cf5.rackcdn.com/6mfo16uxpq.jpg',
    height: 150,
    weight: 60,
    age: 16,
	})

	const [errors, setErrors] = useState({
    heigth: validators.height(),
    weight: validators.weight(),
    age: validators.age(),
	})

  const [touched, setTouched] = useState({})

  const onSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData();
    
    Object.entries(userToEdit).forEach(([key, value]) => {
        if ([key] === weight || height || age) {
          formData.append(key, value);
        }
    });
      
    console.log('formData after append', formData)

    editUser(formData)
      .then(() => {
        push("/profile");
      })
      .catch((e) => {
        if (e.response.status === 400) {
          setErrors(e.response.data.errors);
        }
      });
  }

  const onChange = (e) => {
    console.log(e.target)

    setUser((prevState) => {
      let value = e.target.value;
      if (e.target.type === "file") {
        value = e.target.files[0];
      }
      return {
        ...prevState,
        [e.target.id]: value
      }
    });
    
    const { name, value } = e.target

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

  const onClick = (e) => {
    const { value } = e.target

    setUser((prevState) => ({
          ...prevState,
          avatar: value
    }))
    
    // setErrors((prevState) => ({
    //       ...prevState,
    //       [name]: validators[name] && validators[name](value)
    // }))
  }

  const { avatar, username, password, email, height, weight, age } = userToEdit

  return (
    !user ? ('loading...') : (

    user.avatar ? ('Edit Profile') : (
      <div className="Login mt-4 container d-flex justify-content-center flex-column">
        <h1>Set Up Profile</h1>
          <form className="align-self-center" onSubmit={onSubmit} style={{ maxWidth: 500 }}>
            
          <div className="mb-3">
            <input className="form-control" type="file" onClick={onClick} onChange={onChange}
              name="<Avatar" id="avatar"
            />
            {/* <span className="EditAvatar">&#9999;</span> */}
            </div>
            
          {/* <img src={avatar} alt={user.username} onChange={onChange} className="ProfileAvatar" />*/}
          
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


          <label htmlFor="ageRange" className="form-label">Age</label>
          <input type="range" className="form-range form-control" id="ageRange"
            id="age" name="age" min={16} max={120}
            value={age} onChange={onChange} onBlur={onBlur} onFocus={onFocus}
          />
            <p>{age}</p>

          <label htmlFor="heightRange" className="form-label">Height</label>
          <input type="range" className="form-range form-control" id="heightRange"
            id="height" name="height" min={130} max={230}
            value={height} onChange={onChange} onBlur={onBlur} onFocus={onFocus}
          />
            <p>{height}</p>

          <label htmlFor="weightRange" className="form-label">Weight</label>
          <input type="range" className="form-range form-control" id="weightRange"
            id="weight" name="weight" min={40} max={300}
            value={weight} onChange={onChange} onBlur={onBlur} onFocus={onFocus}
          />
            <p>{weight}</p>

          <button type="submit" className="btn btn-outline-primary">
          Update
          </button>
        </form>
      </div>)
    )
  );
};

export default ProfileForm;