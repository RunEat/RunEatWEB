import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDiary } from '../../services/DiaryService';
import Meal from '../Meal/Meal';
import Sport from '../Sport/Sport';
import CalendarDiary from './CalendarDiary';

const Diary = () => {

    useEffect(() => {
        //getDiary(() => {
            //Usar date para que nos traiga el Diary
        //})
    })

    return (
      <div>
        <CalendarDiary />
        {/* Subir la date de Calendar */}

        <p>Total calories: </p>

        <Link to="/meal">Meal</Link>
        {/* Meter date aquí o el ID del Meal de este Diary/} */}

        <br></br>

        <Link to="/sport">Sport</Link>
        {/* Meter date aquí o el ID del Sport de este Diary */}

        <br></br>

        <Link to="/">Back to home</Link>
      </div>
    );

}

export default Diary;
