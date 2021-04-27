import React from 'react';
import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {activate} from "../../services/AuthService";

const Activate = () => {
    const [user, setUser] = useState();
    const { token } = useParams();

    useEffect(() => {
        activate(token)
            .then(user => setUser(user))
    }, [token] )
        
  return (
    <div>
      <h3>Your account has been activated!</h3>
      <Link to="/login">Go to login</Link>
    </div>
  );
};

export default Activate;