import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { useUser } from '../../hooks/useUserContext';
import { deleteUser } from '../../services/UserService';
import { logout } from '../../store/AccessTokenStore';


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
	
	const deleteAccount = () => {
		deleteUser()
			.then(() => {
				logout();
			})
	}

	const isValid = () => {
    const { errors } = userToDelete;
		console.log('errors', errors)
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
		<div className="ConfirmToDelete">
			<form>
				<label>To confirm delete your account, enter you email:</label>
				<div className="mb-3">
					<input
					className={`form-control ${touched.email && userToDelete.errors.email ? 'is-invalid' : ''}`}
					type="email" id="email" name="email"
					value={userToDelete.email} onChange={onChange} onBlur={onBlur} onFocus={onFocus}
					/>
					<div className="invalid-feedback">{userToDelete.errors.email}</div>
					<button className="btn btn-danger" onClick={deleteAccount} disabled={!isValid()}>Remove Account Forever</button>
				</div>
			</form>
		</div>
	);
};

export default ConfirmToDelete;