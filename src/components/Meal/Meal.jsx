import React, { useEffect, useState } from 'react';
import TotalCalories from './TotalCalories'
import MacrosChart from './MacrosChart'
import Menu from './Menu/Menu';
import { getMeal } from "../../services/MealService";
import { useDate } from "../../hooks/useDateContext";

const Meal = () => {
  
  const { date, setDate } = useDate();
  const [meal, setMeal] = useState();
  
  console.log('date', date)
  let mealDate = date.toISOString();

  console.log('mealDate', mealDate);

  useEffect(() => {
    // if (meal) {
    getMeal(mealDate).then((meal) => {
      setMeal(meal);
      console.log('meal MealComponent', meal)
    });
  }, [mealDate]);
    
  //console.log('meal', meal)

  return (
    <div className="Meal">
      <TotalCalories meal={meal}/>
      <MacrosChart meal={meal}/>
      <Menu meal={meal} setMeal={setMeal}/>
    </div>
  );
};

export default Meal;