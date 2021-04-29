import React, { useEffect, useState } from 'react';
import TotalCalories from './TotalCalories'
import MacrosChart from './MacrosChart'
import Menu from './Menu/Menu';
import { getMeal } from "../../services/MealService";
import { useDate } from "../../hooks/useDateContext";
import { useUser } from '../../hooks/useUserContext';

const Meal = () => {

  const { user } = useUser()
  
  const { date, setDate } = useDate();
  const [meal, setMeal] = useState();
  
  //console.log('date', date)
  let mealDate = date.toISOString();

  console.log('date In MEal', date)

  //console.log('mealDate', mealDate);

  useEffect(() => {
    // if (meal) {
    getMeal(mealDate).then((meal) => {
      setMeal(meal);
      //console.log('meal MealComponent', meal)
    });
  }, [mealDate]);
    
  //console.log('meal', meal)

  return (
    !user ? 'Error - Unauthorized' : (
      <div className="Meal">
        <h1>Day food: {mealDate}</h1>
        <TotalCalories meal={meal}/>
        <MacrosChart meal={meal}/>
        <Menu meal={meal} setMeal={setMeal}/>
      </div>
    )
  );
};

export default Meal;