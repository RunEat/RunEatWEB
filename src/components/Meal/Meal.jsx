import React from 'react';
import TotalCalories from './TotalCalories'
import MacrosChart from './MacrosChart'
import Menu from './Menu/Menu';

const Meal = () => {
  return (
    <div className="Meal">
      <TotalCalories/>
      <MacrosChart/>
      <Menu/>
      
    </div>
  );
};

export default Meal;