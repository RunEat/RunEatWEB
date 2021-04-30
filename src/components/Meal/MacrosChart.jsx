import React, { useEffect, useState } from "react";
import { maximumCalories, maximumCarbs, maximumProteins, maximumFats } from "../../Utils/CalculateCalories";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useUser } from "../../hooks/useUserContext";

function MacrosChart({ meal }) {
  const [fats, setFats] = useState();
  const [proteins, setProteins] = useState();
  const [carbs, setCarbs] = useState();

  const [maxCarbs, setMaxCarbs] = useState();
  const [maxProteins, setMaxProteins] = useState();
  const [maxFats, setMaxFats] = useState();
  
  const { user } = useUser();
  
  useEffect(() => {
      if (user) {
        const TDEE = maximumCalories(user);
        setMaxCarbs(maximumCarbs(TDEE));
        setMaxProteins(maximumProteins(TDEE));
        setMaxFats(maximumFats(TDEE));
    }
  });

  useEffect(() => {
      if (meal) {
        console.log("meal", meal);
      let fatsBreakfast = meal.mealType.breakfast
        ? meal.mealType.breakfast.macros.fats
        : 0;
      let fatsLunch = meal.mealType.lunch
        ? meal.mealType.lunch.macros.fats
        : 0;
      let fatsDinner = meal.mealType.dinner
        ? meal.mealType.dinner.macros.fats
        : 0;
      let fatsSnacks = meal.mealType.snacks
        ? meal.mealType.snacks.macros.fats
        : 0;

      setFats(fatsBreakfast + fatsDinner + fatsLunch + fatsSnacks);

      let proteinsBreakfast = meal.mealType.breakfast
        ? meal.mealType.breakfast.macros.proteins
        : 0;
      let proteinsLunch = meal.mealType.lunch
        ? meal.mealType.lunch.macros.proteins
        : 0;
      let proteinsDinner = meal.mealType.dinner
        ? meal.mealType.dinner.macros.proteins
        : 0;
      let proteinsSnacks = meal.mealType.snacks
        ? meal.mealType.snacks.macros.proteins
        : 0;

      setProteins(proteinsBreakfast + proteinsDinner + proteinsLunch + proteinsSnacks);

      let carbsBreakfast = meal.mealType.breakfast
        ? meal.mealType.breakfast.macros.carbs
        : 0;
      let carbsLunch = meal.mealType.lunch
        ? meal.mealType.lunch.macros.carbs
        : 0;
      let carbsDinner = meal.mealType.dinner
        ? meal.mealType.dinner.macros.carbs
        : 0;
      let carbsSnacks = meal.mealType.snacks
        ? meal.mealType.snacks.macros.carbs
        : 0;

      setCarbs(carbsBreakfast + carbsDinner + carbsLunch + carbsSnacks);
    }
  }, [meal]);

  return (
    <div className="MacrosChart container">
      <h4>Fats</h4>
          <ProgressBar animated now={fats} max={maxFats}/>

      <h4>Proteins</h4>
          <ProgressBar animated now={proteins} max={maxProteins}/>

      <h4>Carbs</h4>
          <ProgressBar animated now={carbs} max={maxCarbs}/>
    </div>
  );
}

export default MacrosChart;
