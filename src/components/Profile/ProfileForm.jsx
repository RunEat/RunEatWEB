import React, { useState, useEffect } from 'react';
import './ProfileForm.css'
import { useHistory } from 'react-router';
import { useUser } from '../../hooks/useUserContext';
import { editUser, getUserInfo } from '../../services/UserService';

// eslint-disable-next-line no-useless-escape
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const ACTIVITY = ['Sedentary', 'Moderate', 'Active', 'Very active'];
const MEAL_PLAN = ["Balanced", "Weight loss", "Weight gain"];

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
  },
  avatar: value => {
    let message

    if (!value) {
      message = 'Avatar is required'
    } 
  }
}

const ProfileForm = () => {
  const { push } = useHistory()

  const { user, setUser } = useUser();
  
  const [userToEdit, setUserToEdit] = useState({
    avatar: '',
    height: 150,
    weight: 60,
    age: 16,
    activity: ["Sendentary"],
    mealPlan: ["Balanced"],
    avatarPreview: '',
  });

  const [show, setShow] = useState(false)
  
  useEffect(() => {
    getUserInfo()
      .then((userToEdit)=> setUserToEdit(userToEdit))
  }, [])

	const [errors, setErrors] = useState({
    heigth: validators.height(),
    weight: validators.weight(),
    age: validators.age(),
    avatar: validators.avatar()
	})

  const [touched, setTouched] = useState({})
  //const [checked, setChecked] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    
    const formData = new FormData();
    
    Object.entries(userToEdit).forEach(([key, value]) => {
      formData.append(key, value);
    });

    //console.log('console', formData)

    console.log('userToEdit', userToEdit)

    if (userToEdit.avatar === '') {
      setShow(true) 
    } 
    
    editUser(formData)
      .then((updatedUser) => {
        console.log("updatedUser", updatedUser);
        if (!updatedUser.avatar) {
          setShow(true) 
        } else {
          setUser(updatedUser);
          push("/profile")
        }
      })
      .catch((e) => {
        if (e.response.status === 400) {
          setErrors(e.response.data.errors);
          }
        });
  }

  const onChange = (e) => {

    setUserToEdit((prevState) => {
      let value = e.target.value;
      //console.log('radio value onChange', e.target.id)

      if (e.target.type === "file") {
        value = e.target.files[0];
      } else if (e.target.id === "activity" ) {               ///REVISAR!!!!!
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

    if (e.target.type === "file") {
      console.log('avatar value', value)
      setUserToEdit((prevState) => ({
        ...prevState,
        avatar: value,
      }))
    } else if (
      e.target.id === "Sedentary" ||
      e.target.id === "Moderate" ||
      e.target.id === "Active" ||
      e.target.id === "Very active"
    ) {
      setUserToEdit((prevState) => ({
        ...prevState,
        activity: value,
      }));
    } else if (
      e.target.id === "Balanced" ||
      e.target.id === "Weight loss" ||
      e.target.id === "Weight gain"
    ) {
      setUserToEdit((prevState) => ({
        ...prevState,
        mealPlan: value,
      }));
    }
  }

  const onChangeAvatar = (e) => {
    e.preventDefault(); 
    console.log('e.target.files', e.target.files[0])
    console.log(userToEdit.avatar, userToEdit.avatarPreview)

    if (e.target.files[0]) {
      setShow(false)
    }

    let reader = new FileReader();
    let file = e.target.files[0];
  
    reader.onloadend = () => {
      setUserToEdit((prevState) => ({
         ...prevState,
        avatar: file,
        avatarPreview: reader.result
       }));
    }
    
     reader.readAsDataURL(file)  
  }
  
  const { avatar, username, email, height, weight, age, activity, mealPlan, avatarPreview } = userToEdit;

  return !user ? (
    "loading..."
  ) : user.avatar ? (
    <div className="ProfileForm mt-4 d-flex justify-content-center flex-column align-items-center text-center">
      <h2 className="text-secondary">PROFILE SETUP</h2>
      <form
        className="d-flex flex-column align-items-center mb-4 mt-2 w-100"
        onSubmit={onSubmit}
        style={{ maxWidth: 500 }}
      >
        {/* <div className="mb-3 w-75">
            <label htmlFor="mealPlan" className="form-label"><small>Choose your meal plan</small></label>
            <select type="range" className="Slider my-2" id="mealPlan"
              id="age" name="age" min={16} max={120}
              value={mealPlan} onChange={onChange} onBlur={onBlur} onFocus={onFocus}
            />
            <p className="text-center text-secondary"><small>{age} years old</small></p>   
          </div> */}

        <div className="mb-3">
          <label className="form-label">
            <small>Choose your meal plan</small>
          </label>
          <br />
          {MEAL_PLAN.map((plan, idx) => (
            <div key={idx} className="d-inline">
              <input
                type="checkbox"
                id={plan}
                name={plan}
                value={[plan]}
                onClick={onClick}
                onBlur={onBlur}
                onFocus={onFocus}
                //checked={checked}
                className="btn-check form-control"
                autoComplete="off"
                active
                aria-pressed="true"
              />
              <label htmlFor={plan} className="btn mealPlanBtn m-2">
                {plan}
              </label>
            </div>
          ))}
          <div className="invalid-feedback">{errors.mealPlan}</div>
        </div>

        <div className="mb-1 w-75">
          <label htmlFor="avatar" className="form-label">
            <small>Update your profile picture</small>
            <br />
            <div style={{ position: "relative" }} className="mt-1">
              <img
                src={avatarPreview ? avatarPreview : avatar}
                alt={user.username}
                //onChange={onChange}
                className="ProfileAvatar img-fluid oldAvatar img-thumbnail p-0"
              />
              <i className="fas fa-upload text-secondary fs-5 py-2 m-1 newPicture"></i>
            </div>
          </label>
          <input
            className="form-control"
            type="file"
            onClick={onClick}
            onChange={onChangeAvatar}
            name="avatar"
            id="avatar"
            placeholder="add an image"
            hidden
          />
          {show && <p className="text-danger">You must add an avatar</p>}
        </div>

        <div className="w-75 mb-3">
          <label htmlFor="username" className="form-label">
            <small>Username</small>
          </label>
          <input
            placeholder={username}
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

        <div className="mb-3 w-75">
          <label htmlFor="email" className="form-label">
            <small>Email</small>
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
          <label className="form-label">
            <small>What's your activity level?</small>
          </label>
          <br />
          {ACTIVITY.map((act, idx) => (
            <div key={idx} className="d-inline">
              <input
                type="checkbox"
                id={act}
                name={act}
                value={[act]}
                onClick={onClick}
                onBlur={onBlur}
                onFocus={onFocus}
                //checked={checked}
                className="btn-check form-control"
                autoComplete="off"
                active
                aria-pressed="true"
              />
              <label
                htmlFor={act}
                className={
                  act == [activity] ? "btn btn-selected m-2" : "btn m-2"
                }
              >
                {act}
              </label>
            </div>
          ))}
          <div className="invalid-feedback">{errors.activity}</div>
        </div>

        <div className="mb-3 w-75">
          <label htmlFor="ageRange" className="form-label mb-0">
            <small>Your age</small>
          </label>
          <p className="text-center text-secondary mb-4">
            <small>{age} years old</small>
          </p>
          <input
            type="range"
            className="Slider my-2"
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
        </div>

        <div className="mb-3 w-75 mt-3">
          <label htmlFor="heightRange" className="form-label mb-0">
            <small>Your height</small>
          </label>
          <p className="text-center text-secondary mb-4">
            <small>{height} cm</small>
          </p>
          <input
            type="range"
            className="Slider my-2"
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
        </div>

        <div className="mb-3 w-75 mt-3">
          <label htmlFor="weightRange" className="form-label mb-0">
            <small>Your weight</small>
          </label>
          <p className="text-center text-secondary mb-4">
            <small>{weight} kg</small>
          </p>
          <input
            type="range"
            className="Slider my-2"
            id="weightRange"
            id="weight"
            name="weight"
            min={40}
            max={300}
            step={0.5}
            value={weight}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
          />
        </div>

        <a
          href="https://www.lifesum.com/disclaimer"
          target="_blank"
          className="mt-3"
        >
          <small>Sources of recommendations</small>
        </a>
        <button type="submit" className="btn w-75 mt-3">
          SAVE CHANGES
        </button>
      </form>
    </div>
  ) : (
    <div className="ProfileForm mt-4 d-flex justify-content-center flex-column align-items-center text-center">
      <h2 className="text-center text-secondary">FINISH YOUR PROFILE</h2>
      {/* <div className="">
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
          </div> */}

      <form
        className="d-flex flex-column align-items-center my-4 w-100"
        onSubmit={onSubmit}
        style={{ maxWidth: 500 }}
      >
        {/* <div className="mb-3 w-75">
            <label htmlFor="mealPlan" className="form-label"><small>Choose your meal plan</small></label>
            <select type="range" className="Slider my-2" id="mealPlan"
              id="age" name="age" min={16} max={120}
              value={mealPlan} onChange={onChange} onBlur={onBlur} onFocus={onFocus}
            />
            <p className="text-center text-secondary"><small>{age} years old</small></p>   
          </div> */}
        <div className="mb-3">
          <label className="form-label">
            <small>Choose your meal plan</small>
          </label>
          <br />
          {MEAL_PLAN.map((plan, idx) => (
            <div key={idx} className="d-inline">
              <input
                type="checkbox"
                id={plan}
                name={plan}
                value={[plan]}
                onClick={onClick}
                onBlur={onBlur}
                onFocus={onFocus}
                className="btn-check form-control"
                autoComplete="off"
                active
                aria-pressed="true"
              />
              <label htmlFor={plan} className="btn mealPlanBtn m-2">
                {plan}
              </label>
            </div>
          ))}
          <div className="invalid-feedback">{errors.mealPlan}</div>
        </div>

        <div className="mb-3">
          <label className="form-label">
            <small>What's your activity level?</small>
          </label>
          <br />
          {ACTIVITY.map((act, idx) => (
            <div key={idx} className="d-inline">
              <input
                type="checkbox"
                id={act}
                name={act}
                value={[act]}
                onClick={onClick}
                onBlur={onBlur}
                onFocus={onFocus}
                autoComplete="off"
                className="btn-check form-control"
                autoComplete="off"
                active
              />
              {/* <label htmlFor={act} className="btn m-2 text-white" shadow-none>
                {act}
              </label> */}
              <label
                htmlFor={act}
                className={
                  act == [activity] ? "btn btn-selected m-2" : "btn m-2"
                }
              >
                {act}
              </label>
            </div>
          ))}
          <div className="invalid-feedback">{errors.activity}</div>
        </div>

        <div className="mb-3 w-75">
          <label htmlFor="ageRange" className="form-label mb-0">
            <small>Your age</small>
          </label>
          <p className="text-center text-secondary mb-4">
            <small>{age} years old</small>
          </p>
          <input
            type="range"
            className="Slider my-2"
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
        </div>

        <div className="mb-3 w-75">
          <label htmlFor="heightRange" className="form-label mb-0">
            <small>Your height</small>
          </label>
          <p className="text-center text-secondary mb-4">
            <small>{height} cm</small>
          </p>
          <input
            type="range"
            className="Slider my-2"
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
        </div>

        <div className="mb-3 w-75">
          <label htmlFor="weightRange" className="form-label mb-0">
            <small>Your weight</small>
          </label>
          <p className="text-center text-secondary mb-4">
            <small>{weight} kg</small>
          </p>
          <input
            type="range"
            className="Slider my-2"
            id="weightRange"
            id="weight"
            name="weight"
            min={40}
            max={300}
            step={0.5}
            value={weight}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
          />
        </div>

        <div className="mb-1 w-75">
          <label htmlFor="avatar" className="form-label">
            <small>Add your profile picture</small>
            <br />
            <div style={{ position: "relative" }} className="mt-1">
              <img
                src={avatarPreview ? avatarPreview : avatar}
                alt={user.username}
                //onChange={onChange}
                className="ProfileAvatar img-fluid oldAvatar img-thumbnail p-0"
              />
              <i className="fas fa-upload text-secondary fs-5 py-2 m-1 newPicture"></i>
            </div>
          </label>
          <input
            className="form-control"
            type="file"
            onClick={onClick}
            onChange={onChangeAvatar}
            name="avatar"
            id="avatar"
            placeholder="add an image"
            hidden
          />
          {show && <p className="text-danger">You must add an avatar</p>}
        </div>

        {/* <div className="form-group mt-3">
            <label htmlFor="mealPlan">Gender</label>
            <select
              id="mealPlan"
              className={`form-control ${errors.mealPlan && "is-invalid"} `}
              value={mealPlan}
              onChange={onChange}
            >
              {GENDERS.map((g, i) => (
                <option key={i}>{g}</option>
              ))}
            </select>
            <div className="invalid-feedback">{errors.mealPlan}</div>
          </div> */}

        {/* <div className="mt-3">
          <label htmlFor="activity" className="form-label"><small>What's your activity level?</small></label>
          <select
            id="activity"
            className={`form-control ${errors.activity && "is-invalid"} `}
            value={activity}
            onChange={onChange}
          >
            {ACTIVITY.map((act, idx) => (
              <option key={idx}>{act}</option>
            ))}
          </select> 
        </div> */}
        <a
          href="https://www.lifesum.com/disclaimer"
          target="_blank"
          className="mt-3"
        >
          <small>Sources of recommendations</small>
        </a>
        <button type="submit" className="btn text-white w-75 mt-3">
          NEXT
        </button>
      </form>
    </div>
  );
}

export default ProfileForm;