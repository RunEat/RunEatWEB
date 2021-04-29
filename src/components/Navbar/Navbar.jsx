import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getMeal } from '../../services/MealService';
import { useDate } from '../../hooks/useDateContext';
import { setStoredDate } from "../../store/DateStore";

const Navbar = () => {
    const [meal, setMeal] = useState()

    const { date, setDate } = useDate();

    const [redirect, setRedirect] = useState(false)
    
    const onClick = () => {
        let today = new Date()
        getMeal(today)
            .then((meal) => {
                setMeal(meal)
            })
        setDate(today)
        setStoredDate(today)
    }
    
    return (
        <div>
            <nav className="navbar fixed-bottom navbar-light bg-light d-flex justify-content-center">
                <button className="btn btn-primary mx-1"><Link className="text-white" to="/profile">Profile</Link></button>
                <button className="btn btn-secondary mx-1"><Link className="text-white" to="/diary">Diary</Link></button>
                <button className="btn btn-success mx-1"><Link className="text-white" to="/sport">Sport Today</Link></button>
                <button className="btn btn-danger mx-1"><Link className="text-white" to="/meal" onClick={onClick}>Meal Today</Link></button>
            </nav>
        </div>
    );
}

export default Navbar;
