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


const Meal = () => {

  const { user } = useUser()
  
  const { date, setDate } = useDate();
  const [meal, setMeal] = useState();
  
  let mealDate = getStoredDate()

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
      <SyncLoader color="#3ec4fc" />
    </div>
  ) : (
    //user.id == meal.user.id &&
    <div className="Meal">
      <h1>Day food: {mealDate}</h1>
      <TotalCalories meal={meal} />
      <MacrosChart meal={meal} />
      <Menu meal={meal} setMeal={setMeal} />
      <Navbar/>
    </div>
  );
};

export default Meal;