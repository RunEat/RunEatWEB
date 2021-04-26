import React from 'react';
import Chart from './Chart'

const Meal = () => {
  return (
    <div>
      <Chart />
      <table>
        <tr className="text-align-center">
          <td>Fats</td>
          <td>20/50 g</td>
        </tr>
        <tr>
          <td>Proteins</td>
          <td>20/50 g</td>
        </tr>
        <tr>
          <td>Carbs</td>
          <td>20/50 g</td>
        </tr>
      </table>
    </div>
  );
};

export default Meal;