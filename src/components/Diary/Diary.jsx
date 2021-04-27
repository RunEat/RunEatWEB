import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { getDiary } from '../../services/DiaryService';
// import Meal from '../Meal/Meal';
// import Sport from '../Sport/Sport';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Diary.css";

const Diary = () => {
    const [date, setDate] = useState(new Date());
    const [diary, setDiary] = useState()
    
    let newDate = date.toISOString();

    useEffect(() => {
        console.log("newDate", newDate);
        // getDiary(newDate)
        //     .then((diary) => console.log(diary));
    }, [newDate]);

    
    const onChange = (date) => {
        setDate(date);
    };

    //console.log(date);

    return (
      <div>
        <Calendar onChange={onChange} value={date} />
        <p>Total calories: </p>

        {/* <Link to={`/meal/${diary.meal}`}>Meal</Link> */}

        <br></br>

        {/* <Link to={`/sport/${diary.sport}`}>Sport</Link> */}

        <br></br>

        <Link to="/">Back to home</Link>
      </div>
    );

}

export default Diary;
