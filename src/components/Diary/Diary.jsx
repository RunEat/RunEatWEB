import React, { useState, useEffect } from "react";
import { Link, Redirect } from 'react-router-dom';
import { getDiary } from '../../services/DiaryService';
// import Meal from '../Meal/Meal';
// import Sport from '../Sport/Sport';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Diary.css";
import { useDate } from '../../hooks/useDateContext';
import { getMeal } from "../../services/MealService";
import { setStoredDate, getStoredDate } from "../../store/DateStore";

const Diary = () => {
    const { date, setDate } = useDate()
    // const [date, setDate] = useState(new Date());

    const [diary, setDiary] = useState()
    //console.log('context date prev toISOString()', date)
    
    //let newDate = date.toISOString().setUTCDate()
    //newDate.toISOString()
    
    
    //console.log("newDate", newDate);
    
    // useEffect(() => {
      //   console.log('newDate useEffect', newDate)
      //   getDiary(newDate)
      //     .then((diaryDB) => {
        //       //setDate(newDate)  ---- Solucionar actualizar estado de Date
        //       setDiary(diaryDB)
        //     })
        // }, [newDate]);
        
    const onChange = (date) => {
      // console.log('date onChange', date)
      date.setHours(date.getHours() + 4)
      // let newDate= date.toISOString()
      
   
      setDate(date);
      setStoredDate(date)


      getDiary(date)
      .then((diary)=> {
        setDiary(diary)
        console.log('diary in diary', diary)
      })
    };

    console.log('date Diary', date)

  // useEffect(() => {
  //   if (diary) {
  //     getMeal(date).then((meal) => {
  //       console.log('meal MealComponent', meal)
  //     });
  //   }
  // }, [date]);
 
  return (
    !date ? (
        <p>Loading</p>
    ) : (
      <div>
          <Calendar onChange={onChange} value={date} />
          {!diary ? ('create new Meal con newDate') :  (
            <>
            <p>Total calories: {diary.meal.mealType.breakfast.calories}</p>

            <Link to={`/meal`}>Meal</Link>

            <br></br>

            <Link to={`/sport`}>Sport</Link>

            </>
          )}

            <Link to="/">Back to home</Link>
      </div> 
      )
    );

}

export default Diary;
