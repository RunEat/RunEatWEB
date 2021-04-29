import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { getDiary } from '../../services/DiaryService';
// import Meal from '../Meal/Meal';
// import Sport from '../Sport/Sport';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Diary.css";
import { useDate } from '../../hooks/useDateContext';
import { getMeal } from "../../services/MealService";
import { setStoredDate, getStoredDate } from "../../store/DateStore";
import { useUser } from '../../hooks/useUserContext';

const Diary = () => {
  const { date, setDate } = useDate()

  const [diary, setDiary] = useState()
  
  const { user, setUser } = useUser();

  const [show, setShow] = useState(false)

  const totalCalories = () => {
      let breakfast = diary.meal.mealType.breakfast ? diary.meal.mealType.breakfast.calories : 0
      let lunch = diary.meal.mealType.lunch ? diary.meal.mealType.lunch.calories : 0
      let dinner = diary.meal.mealType.dinner ? diary.meal.mealType.dinner.calories : 0
      let snacks = diary.meal.mealType.snacks ? diary.meal.mealType.snacks.calories : 0

      return breakfast + lunch + dinner + snacks
    }

  console.log('user', user)

  // if (user.id === diary.user) { 
  //   setShow(true)
  // }
        
    const onChange = (date) => {
      // console.log('date onChange', date)
      date.setHours(date.getHours() + 4)
   
      setDate(date);
      setStoredDate(date)

      getDiary(date)
      .then((diary)=> {
        setDiary(diary)
        console.log('diary in diary', diary)
      })
    };

  console.log('date Diary', date)
  
  if (show) {
  }
  
  return (
    !date ? (
        <p>
        <p>Loading</p>
        </p>
    ) : (
      <div>
          <Calendar onChange={onChange} value={date} />
          {!diary ? ('create new Meal with newDate') :  (
            <>
            <p>Total calories: {totalCalories()} cal</p>

            <Link to={`/meal`}>Meal</Link>

            <br/>

            <Link to={`/sport`}>Sport</Link>

            </>
          )}

            <Link to="/">Back to home</Link>
      </div> 
    )
  );

}

export default Diary;
