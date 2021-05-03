import React, { useState, useEffect } from 'react';
import './ProfileForm.css'
import { useHistory } from 'react-router';
import { useUser } from '../../hooks/useUserContext';
import { editUser, getUserInfo } from '../../services/UserService';

// eslint-disable-next-line no-useless-escape
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const ACTIVITY = ['Low/Sedentary', 'Moderate', 'Active', 'Very active'];

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

  const { user, setUser } = useUser();
  
  const [userToEdit, setUserToEdit] = useState({
    avatar:
      "https://prod.liveshare.vsengsaas.visualstudio.com/join?CD38E7B67E848E56EC1A6FEA6807F1B33307",
    height: 150,
    weight: 60,
    age: 16,
    activity: "Sendentary",
  });
  
  useEffect(() => {
    getUserInfo()
      .then((userToEdit)=> setUserToEdit(userToEdit))
  }, [])

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
        // if ([key] === weight || height || age || avatar) {
        //   console.log (formData)
        // }
        formData.append(key, value);
    });
      
    //console.log('formData after append', formData)

    editUser(formData)
      .then((updatedUser) => {
        setUser(updatedUser);
        push("/meal")
      })
      .catch((e) => {
        if (e.response.status === 400) {
          setErrors(e.response.data.errors);
        }
      });
  }

  const onChange = (e) => {
    //console.log(e.target)

    setUserToEdit((prevState) => {
      let value = e.target.value;
      if (e.target.type === "file") {
        value = e.target.files[0];
      } else if (e.target.id === "activity") {
        value = [...e.target.selectedOptions].map((opt) => opt.value);
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

    setUserToEdit((prevState) => ({
          ...prevState,
          avatar: value
    }))
    
    // setErrors((prevState) => ({
    //       ...prevState,
    //       [name]: validators[name] && validators[name](value)
    // }))
  }
  
  const { avatar, username, email, height, weight, age, activity} = userToEdit;

  return !user ? (
    "loading..."
  ) : user.avatar ? (
    <div className="Login mt-4 container d-flex justify-content-center flex-column">
      <h1>Set Up Profile</h1>
      <form
        className="align-self-center"
        onSubmit={onSubmit}
        style={{ maxWidth: 500 }}
      >
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username (Name y Surname?)
          </label>
          <input
            placeholder={user.username}
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
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            placeholder={user.email}
            className={`form-control ${
              touched.email && errors.email ? "is-invalid" : ""
            }`}
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
          />
          <div className="invalid-feedback">{errors.email}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="ageRange" className="form-label">
            Age
          </label>
          <input
            type="range"
            className="form-range form-control"
            id="ageRange"
            id="age"
            name="age"
            min={16}
            max={120}
            value={age}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
          />
          <p>{age}</p>
        </div>

        <div className="mb-3">
          <label htmlFor="heightRange" className="form-label">
            Height
          </label>
          <input
            type="range"
            className="form-range form-control"
            id="heightRange"
            id="height"
            name="height"
            min={130}
            max={230}
            value={height}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
          />
          <p>{height}</p>
        </div>

        <div className="mb-3">
          <label htmlFor="weightRange" className="form-label">
            Weight
          </label>
          <input
            type="range"
            className="form-range form-control"
            id="weightRange"
            id="weight"
            name="weight"
            min={40}
            max={300}
            value={weight}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
          />
          <p>{weight}</p>
        </div>

        <div className="form-group mt-3">
          <label htmlFor="activity">What's your activity level?</label>
          <select
            id="activity"
            className={`form-control ${errors.activity && "is-invalid"} `}
            value={activity}
            onChange={onChange}
          >
            {ACTIVITY.map((g, i) => (
              <option key={i}>{g}</option>
            ))}
          </select>
          <div className="invalid-feedback">{errors.activity}</div>
        </div>

        <div className="mb-3">
          <input
            className="form-control"
            type="file"
            onClick={onClick}
            onChange={onChange}
            name="<Avatar"
            id="avatar"
          />
          {/* <span className="EditAvatar">&#9999;</span> */}

          {/* <img src={avatar} alt={user.username} onChange={onChange} className="ProfileAvatar" />*/}
        </div>

        {/* <div className="form-group mt-3">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              className={`form-control ${errors.gender && "is-invalid"} `}
              value={gender}
              onChange={onChange}
            >
              {GENDERS.map((g, i) => (
                <option key={i}>{g}</option>
              ))}
            </select>
            <div className="invalid-feedback">{errors.gender}</div>
          </div> */}


        <button type="submit" className="btn btn-outline-primary">
          Update
        </button>
      </form>
    </div>
      ) : (
      <div className="ProfileForm mt-4 d-flex justify-content-center flex-column align-items-center text-center">
        <h2 className="text-center mt-4 text-secondary">FINISH YOUR PROFILE</h2>
          {/* <div className="">
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
          </div> */}

          <form className="d-flex flex-column align-items-center my-4 w-100" onSubmit={onSubmit} style={{ maxWidth: 500 }}>
          {/* <div className="mb-3 w-75">
            <label htmlFor="mealPlan" className="form-label"><small>Choose your meal plan</small></label>
            <select type="range" className="Slider my-2" id="mealPlan"
              id="age" name="age" min={16} max={120}
              value={mealPlan} onChange={onChange} onBlur={onBlur} onFocus={onFocus}
            />
            <p className="text-center text-secondary"><small>{age} years old</small></p>   
          </div> */}
          
          
          <div className="mb-3 w-75">
            <label htmlFor="ageRange" className="form-label"><small>Your age</small></label>
            <input type="range" className="Slider my-2" id="ageRange"
              id="age" name="age" min={16} max={120}
              value={age} onChange={onChange} onBlur={onBlur} onFocus={onFocus}
            />
            <p className="text-center text-secondary"><small>{age} years old</small></p>   
          </div>

          <div className="mb-3 w-75">
            <label htmlFor="heightRange" className="form-label"><small>Your height</small></label>
            <input type="range" className="Slider my-2" id="heightRange"
              id="height" name="height" min={130} max={230}
              value={height} onChange={onChange} onBlur={onBlur} onFocus={onFocus}
            />
              <p className="text-center text-secondary"><small>{height} cm</small></p>    
          </div>

          <div className="mb-3 w-75">
            <label htmlFor="weightRange" className="form-label"><small>Your weight</small></label>
            <input type="range" className="Slider my-2" id="weightRange"
              id="weight" name="weight" min={40} max={300}
              value={weight} onChange={onChange} onBlur={onBlur} onFocus={onFocus}
            />
              <p className="text-center text-secondary"><small>{weight} kg</small></p>      
          </div>

          <div className="mb-3 w-75">
          <label htmlFor="avatar" className="form-label">
            <small>Add an image</small>
            <br/>
            <h1 className="text-white">+</h1>
            <i className="fas fa-folder-upload bg-secondary fs-5"></i>
          </label>
            <input className="form-control" type="file" onClick={onClick} onChange={onChange}
              name="<Avatar" id="avatar" placeholder="add an image" hidden
            />
          </div>

          {/* <div className="form-group mt-3">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              className={`form-control ${errors.gender && "is-invalid"} `}
              value={gender}
              onChange={onChange}
            >
              {GENDERS.map((g, i) => (
                <option key={i}>{g}</option>
              ))}
            </select>
            <div className="invalid-feedback">{errors.gender}</div>
          </div> */}

        <div className="form-group mt-3">
          <label htmlFor="activity">What's your activity level?</label>
          <select
            id="activity"
            className={`form-control ${errors.activity && "is-invalid"} `}
            value={activity}
            onChange={onChange}
          >
            {ACTIVITY.map((g, i) => (
              <option key={i}>{g}</option>
            ))}
          </select>
          <div className="invalid-feedback">{errors.activity}</div>
        </div>

          <a href=""><small>Sources of recommendations</small></a>
          <button type="submit" className="btn text-white w-75 mt-2">NEXT</button>
        </form>
      </div>
    )
}

export default ProfileForm;