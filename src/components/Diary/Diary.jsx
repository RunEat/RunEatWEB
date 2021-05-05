import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
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
import SyncLoader from "react-spinners/SyncLoader";
import Navbar from "../Navbar/Navbar";

const Diary = () => {
  const { date, setDate } = useDate();
  const { user, setUser } = useUser();

  //console.log("user", user);

  const [diary, setDiary] = useState(); //TODO: Meter estado inicial

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
      console.log("diaryDB", diary);
      if (diary.sport) {
        setDiary(diary);
        console.log("diaryCompleted", diary);
      }
      if (diary.errors) {
        setDiary();
      }
    });
    //.catch(console.log('No diary'))
  };

  useEffect(() => {
    //console.log("useEffect date", mealDate);
    addMeal(date).then((diary) => {
      setDiary(diary);
    });
  }, []);

  //console.log("user", user);
  //console.log("diary", diary);

  return (
    <div className="Diary text-center d-flex flex-column align-items-center pt-5 bg-light">
      {!date ? (
        <div className="text-center">
          <SyncLoader color="#00bd56" />
        </div>
      ) : !user ? (
        <Redirect to='/login' />
      ) : (
        <div>
          {
            <>
              {!diary ? (
                <>
                  <Calendar onChange={onChange} value={date} />
                  <div className="d-flex mt-5">
                    <Link to={`/meal`} className="btn me-4 colorMeal">
                      <i className="fas fa-plus me-2 colorMeal"></i>
                      New Meal
                    </Link>

                    <br />

                    <Link to={`/sport`} className="btn me-4 colorSport">
                      <i className="fas fa-plus me-2 colorSport"></i>
                      New Sport
                    </Link>
                  </div>
                </>
              ) : user.id === diary.user.id ? (
                <>
                  <Calendar onChange={onChange} value={date} />
                  <h4 className="mt-5 text-secondary">Total calories:</h4>
                  <h1>{totalCalories()} cal</h1>
                  <div className="d-flex mt-5">
                    <Link to={`/meal`} className="btn me-4 colorMeal">
                      <i className="fas fa-edit me-2 colorMeal"></i>
                      Update Meal
                    </Link>

                    <br />

                    <Link to={`/sport`} className="btn me-4 colorSport">
                      <i className="fas fa-plus me-2 colorSport"></i>
                      New Sport
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <Calendar onChange={onChange} value={date} />
                  <div className="d-flex mt-5">
                    <Link to={`/meal`} className="btn me-4 colorMeal">
                      <i className="fas fa-plus me-2 colorMeal"></i>
                      New Meal
                    </Link>

                    <br />

                    <Link to={`/sport`} className="btn me-4 colorSport">
                      <i className="fas fa-plus me-2 colorSport"></i>
                      New Sport
                    </Link>
                  </div>
                </>
              )}
            </>
          }
          <Navbar />
        </div>
      )}
    </div>
  );
};

export default Diary;
