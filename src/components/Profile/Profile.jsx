import React from 'react';
import { useUser } from '../../hooks/userUserContext';
import { Link } from 'react-router-dom';

function Profile() {

    const { user } = useUser()
    
    return ( 
        
        <div className="Profile">
            { user ? (<div className="card" style={{width: '18rem'}}>
                    <div className="card-body">
                        <img src={user.avatar} className="card-img-top" alt={user.username}/>
                        <h5 className="card-title">{user.username}</h5>
                        <p className="card-text">{user.email}</p>
                        <p className="card-text">{user.age}</p>
                        <p className="card-text">{user.height}</p>
                        <p className="card-text">{user.weight}</p>
                        <Link to="/profile/edit" className="btn btn-primary">Edit Profile</Link>
                    </div>
                </div>
            ) : (
                <p>loading...</p>
            )
                

            }
            
        </div>
    );
}

export default Profile;