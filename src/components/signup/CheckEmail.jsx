import React from 'react';
import './Signup.css'
import { Link } from "react-router-dom"

const CheckEmail = () => {
  return (
    <div className="CheckEmail container text-center d-flex flex-column justify-content-center align-items-center backgroundCheckEmail">
      <h1 className="colorTitles">Check your email </h1>
      <h2 className="colorTitles">and activate your account</h2>
      <i className="fas fa-paper-plane mt-5 mb-5" style={{'color': '#fff', 'fontSize':'8rem'}}></i>
      <Link 
        className="btn LoginButton colorLink w-75" 
        style={{'border-radius': '5rem', color: '#00bd56', backgroundColor: '#fff'}}
        to="/login">GO TO LOG IN
      </Link>
    </div>
  );
};

export default CheckEmail;