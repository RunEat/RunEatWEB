import React, { useEffect, useState } from 'react';
import TotalCalories from './TotalCalories'
import MacrosChart from './MacrosChart'
import Menu from './Menu/Menu';
import Navbar from "../Navbar/Navbar";
import { getMeal } from "../../services/MealService";
import { useDate } from "../../hooks/useDateContext";
import { useUser } from '../../hooks/useUserContext';
import { getStoredDate } from '../../store/DateStore';
import SyncLoader from 'react-spinners/SyncLoader';
import { Link } from 'react-router-dom';
import './Meal.css'

const Meal = () => {

  const { user } = useUser()
  
  const { date, setDate } = useDate();
  const [meal, setMeal] = useState();
  
  let mealDate = getStoredDate()

  const formatedDate = () => {
    const formatedDate = new Date(mealDate.split('T')[0])
    return formatedDate.toDateString()
  }

  formatedDate()

  useEffect(() => {
    // if (meal) {
    getMeal(mealDate)
      .then((meal) => {
        setMeal(meal);
        //console.log('meal MealComponent', meal)
      });
  }, [mealDate]);
    
  //console.log('meal', meal)

  return !date ? (
    <div className="text-center">
      <SyncLoader color="#00bd56" />
    </div>
  ) : (
    //user.id == meal.user.id &&
    <div className="Meal d-flex flex-column align-items-center justify-content-center">
      <div className="CaloriesSummary d-flex flex-column align-items-center">
        <h1 className="text-white mt-4 mb-2 w-50 text-center">{formatedDate()}</h1>
        <TotalCalories className="TotalCalories" meal={meal} />
        <MacrosChart className="MacrosChart" meal={meal} />
      </div>
      <Menu meal={meal} setMeal={setMeal} />
      <Navbar/>
    </div>
  );
};

export default Meal;