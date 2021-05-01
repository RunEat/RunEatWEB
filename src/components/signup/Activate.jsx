import React from 'react';
import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { activate } from "../../services/AuthService";
import './Signup.css'

const Activate = () => {
    const [user, setUser] = useState();
    const { token } = useParams();

    useEffect(() => {
        activate(token)
            .then(user => setUser(user))
    }, [token] )
        
  return (
    <div className="Activate text-center d-flex flex-column justify-content-center align-items-center mt-5 heightActivate">
      <h3 className="mx-4">Your account has been activated!</h3>
      <img className="w-100" src="../../../images/saladGif.gif"/>
      <Link 
        className="btn LoginButton colorLink w-75" 
        style={{'border-radius': '5rem', color: '#fff', backgroundColor: '#00bd56'}}
        to="/login">GO TO LOG IN
      </Link>
    </div>
  );
};

export default Activate;