import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar fixed-bottom navbar-light bg-light d-flex justify-content-center">
                    <button className="btn btn-primary mx-1"><Link className="text-white" to="/profile">Profile</Link></button>
                    <button className="btn btn-secondary mx-1"><Link className="text-white" to="/diary">Diary</Link></button>
                    <button className="btn btn-success mx-1"><Link className="text-white" to="/sport">Sport</Link></button>
                    <button className="btn btn-danger mx-1"><Link className="text-white" to="/meal">Meal</Link></button>
                </nav>
            </div>
        );
    }
}

export default Navbar;
