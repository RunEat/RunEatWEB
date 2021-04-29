import React from 'react';
import { useUser } from '../../hooks/useUserContext';
import { Link, Redirect } from 'react-router-dom';

function Profile() {

    const { user } = useUser()
    
    return (
        !user ? ('Error - Unauthorized') : (
            !user.avatar ? (
                <Redirect to='/profile/edit'/>
            ) : (
                <div className="Profile">
                    { user ? (<div className="card" style={{width: '18rem'}}>
                            <div className="card-body">
                                <img src={user.avatar} className="card-img-top" alt={user.username}/>
                                <h5 className="card-title">Username: {user.username}</h5>
                                <p className="card-text">Email: {user.email}</p>
                                <p className="card-text">Age: {user.age}</p>
                                <p className="card-text">Height: {user.height}</p>
                                <p className="card-text">Weight: {user.weight}</p>
                                <Link to="/profile/edit" className="btn btn-primary">Edit Profile</Link>
                            </div>
                        </div>
                    ) : (
                        <p>loading...</p>
                    )
                        
    
                    }
                    
                </div>      
            )
        )
    );
}

export default Profile;