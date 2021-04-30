import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getDiary } from "../../services/DiaryService";
// import Meal from '../Meal/Meal';
// import Sport from '../Sport/Sport';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Diary.css";
import { useDate } from "../../hooks/useDateContext";
import { getMeal, addMeal } from "../../services/MealService";
import { setStoredDate } from "../../store/DateStore";
import { useUser } from "../../hooks/useUserContext";
import SyncLoader from 'react-spinners/SyncLoader';

const Diary = () => {
  const { date, setDate } = useDate();
  const { user, setUser } = useUser();

  const [diary, setDiary] = useState();

  const totalCalories = () => {
    let breakfast = diary.meal.mealType.breakfast
      ? diary.meal.mealType.breakfast.calories
      : 0;
    let lunch = diary.meal.mealType.lunch
      ? diary.meal.mealType.lunch.calories
      : 0;
    let dinner = diary.meal.mealType.dinner
      ? diary.meal.mealType.dinner.calories
      : 0;
    let snacks = diary.meal.mealType.snacks
      ? diary.meal.mealType.snacks.calories
      : 0;

    return breakfast + lunch + dinner + snacks;
  };

  const onChange = (date) => {
    // console.log('date onChange', date)
    date.setHours(date.getHours() + 4);

    setDate(date);
    setStoredDate(date);
    
    getDiary(date).then((diary) => {
      setDiary(diary);
      //console.log("diary in diary", diary);
    });

  };

  useEffect(() => {
    //console.log("useEffect date", mealDate);
    addMeal(date)
      .then((diary) => {
        setDiary(diary);
    });
  }, [])
  
  console.log('user', user)
  console.log("diary", diary);

  return (
    <>
    <Calendar onChange={onChange} value={date} />
      {!date ? (
        <div className="text-center">
          <SyncLoader color="#3ec4fc" />
        </div>
      ) : (
        <div>
          {
            //user.id == diary.user.id && (
            <>
              {!diary ? (
                "create new Meal with newDate"
              ) : (
                <>
                  <p>Total calories: {totalCalories()} cal</p>

                  <Link to={`/meal`}>Meal</Link>

                  <br />

                  <Link to={`/sport`}>Sport</Link>
                </>
              )}
            </>
            }
          <Link to="/">Back to home</Link>
        </div>
      )}
    </>
  )
}

export default Diary;
