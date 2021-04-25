import React from 'react';
import { Link } from "react-router-dom"
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
    const [user, setUser] = useState();
    const { token } = useParams();

    useEffect(() => {
        passwordReset(token)
            .then(user => setUser(user))
    }, [token])
    

    const onSubmit = (e) => {
        e.preventDefault()
    
        console.log(user)
        updatePassword(user)
            .then(() => push('/user/login'))
    }

    const onChange = (e) => {
        const {value } = e.target

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
        
    return (
    <div className="ChangePassword">
		<label htmlFor="password" className="form-label">Password</label>
		<input
			className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
			type="password" id="password" name="password"
			value={password} onChange={onChange} onBlur={onBlur} onFocus={onFocus}
		/>
		<div className="invalid-feedback">{errors.password}</div>
    </div>
  );
};

export default ChangePassword;