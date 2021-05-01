import React from 'react';
import { useUser } from '../../hooks/useUserContext';
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

function Profile() {

    const { user } = useUser()
    
    return !user ? (
      "Error - Unauthorized"
    ) : !user.avatar ? (
      <Redirect to="/profile/edit" />
    ) : (
      <div className="Profile container">
        {user ? (
          <>
          <div className="InfoProfile">
            <img
              src={user.avatar}
              className="card-img-top"
              alt={user.username}
            />
            <h5 className="card-title">Username: {user.username}</h5>
            <p className="card-text">Activity level: {user.activity}</p>
          </div>
              
          <div className="InfoBody">
            <p className="card-text">Age: {user.age}</p>
            <p className="card-text">Height: {user.height}</p>
            <p className="card-text">Weight: {user.weight}</p>
          </div>
                
          <div className="Settings">
            <p className="card-text">Email: {user.email}</p>
            <Link to="/profile/edit" className="btn btn-primary">
              Edit Profile
            </Link>
            <Link to="/profile/delete" className="btn btn-primary">
              Delete Account
            </Link>
          </div>
                
            <Navbar/>
          </>
        ) : (
          <p>loading...</p>
        )}
      </div>
    );
}

export default Profile;