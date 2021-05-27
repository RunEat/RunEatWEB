import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { useUser } from '../../hooks/useUserContext';
import { deleteUser } from '../../services/UserService';
import { logout } from '../../store/AccessTokenStore';
import Navbar from '../Navbar/Navbar';


const validators = {
	email: (value, email) => {
		let message

		if (!value) {
		message = 'Email is required'
		} else if (value !== email ) {
		message = 'Email is invalid'
		}

		return message
	},
}

const ConfirmToDelete = () => {
	
	const { user, setUser } = useUser();
	
	const [touched, setTouched] = useState({})
	
	const [userToDelete, setUserToDelete] = useState({
		fields: {email: ''},
		errors: {email: validators.email()}
	})
	
	const deleteAccount = (e) => {
    e.preventDefault();
    
		deleteUser()
			.then(() => {
				logout();
			})
	}

	const isValid = () => {
    const { errors } = userToDelete;
    return !Object.keys(errors).some(error => errors[error]);
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
	
	const onChange = (e) => {
    const { name, value } = e.target

		setUserToDelete((prevState) => ({
			fields: {
				...prevState.fields,
				[name]: value
			}, errors: {
				...prevState.errors,
				[name]: validators[name] && validators[name](value, user.email)
			}
			}
		))
	}
	
	return (
    <div className="ConfirmToDelete container p-5 text-justify">
      <i className="fas fa-exclamation-triangle fs-1 d-flex justify-content-center"></i>
      <h1 className="mt-3">
        Are you sure you want to delete your RunEat account?
      </h1>
      <form className="mt-3">
        <label className="form-label text-dark">
          Upon confirmation there's no turning back.
          <br />
          If you're completely sure, enter your email account to confirm:
        </label>
        <div className="mb-3  text-center">
          <input
            className={`form-control border border-dark my-3 ${
              touched.email && userToDelete.errors.email ? "is-invalid" : ""
            }`}
            type="email"
            id="email"
            name="email"
            value={userToDelete.email}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
          />
          <div className="invalid-feedback">{userToDelete.errors.email}</div>
          <button
            className="btn btn-danger mt-2"
            onClick={deleteAccount}
            disabled={!isValid()}
            style={{ borderRadius: "2rem" }}
          >
            Remove my account forever
          </button>
        </div>
      </form>
      <Navbar/>
    </div>
  );
};

export default ConfirmToDelete;