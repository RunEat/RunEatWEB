import React, { useEffect, useState } from "react";
import TotalCalories from "./TotalCalories";
import MacrosChart from "./MacrosChart";
import Menu from "./Menu/Menu";
import Navbar from "../Navbar/Navbar";
import { getMeal } from "../../services/MealService";
import { useDate } from "../../hooks/useDateContext";
import { useUser } from "../../hooks/useUserContext";
import { getStoredDate } from "../../store/DateStore";
import SyncLoader from "react-spinners/SyncLoader";
import { Link, Redirect } from "react-router-dom";
import "./Meal.css";
import { formatedDate } from "../../constants/FormatedDate";
import { getDiary } from "../../services/DiaryService";

const Meal = () => {
  const { user } = useUser();

  const { date, setDate } = useDate();
  const [meal, setMeal] = useState();
  const [sport, setSport] = useState();

  let mealDate = getStoredDate();

  useEffect(() => {
    getMeal(mealDate)
      .then((meal) => {
        if (meal) {
          setMeal(meal);
          //console.log('meal MealComponent', meal)
        }
        if (!meal) {
          setMeal()
        }
      });
  }, [mealDate]);
  
  useEffect(() => {
    getDiary(mealDate)
      .then((diary) => {
        if (diary.sport) {
          setSport(diary.sport)
        }
        if (!diary.sport) {
          setSport()
        }
      })
  }, [mealDate]);

  console.log('user', user)

  return !date ? (
    <div className="text-center">
      <SyncLoader color="#00bd56" />
    </div>
  ) : (
        <>
        <div
          className="Meal d-flex flex-column align-items-center justify-content-center bg-light"
          style={{ maxHeight: "400vh", overflow: "scroll" }}
        >
          <div className="CaloriesSummary d-flex flex-column align-items-center">
            <h1 className="text-white mt-4 mb-2 w-75 text-center mb-3">
              {formatedDate(mealDate)}
            </h1>
            <TotalCalories 
              className="TotalCalories" 
              meal={meal}
              sport={sport}
            />
            <MacrosChart className="MacrosChart" meal={meal} />
          {user && <h6 className="text-light mt-3">Meal Plan · {user.mealPlan}</h6>}
          </div>
          <Menu meal={meal} setMeal={setMeal} />
        </div>
            <Navbar />
        </>
      )
};

export default Meal;
