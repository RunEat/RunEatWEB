import React, { useEffect, useState } from "react";
import {
  maximumCalories,
  maximumCarbs,
  maximumProteins,
  maximumFats,
} from "../../Utils/CalculateCalories";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useUser } from "../../hooks/useUserContext";

function MacrosChart({ meal }) {
  const [fats, setFats] = useState(0);
  const [proteins, setProteins] = useState(0);
  const [carbs, setCarbs] = useState(0);

  const [maxCarbs, setMaxCarbs] = useState();
  const [maxProteins, setMaxProteins] = useState();
  const [maxFats, setMaxFats] = useState();

  const [carbsColor, setCarbsColor] = useState("success");
  const [proteinsColor, setProteinsColor] = useState("success");
  const [fatsColor, setFatsColor] = useState("success");

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
      //console.log("meal", meal);
      let fatsBreakfast = meal.mealType.breakfast
        ? meal.mealType.breakfast.macros.fats
        : 0;
      let fatsLunch = meal.mealType.lunch ? meal.mealType.lunch.macros.fats : 0;
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

      setProteins(
        proteinsBreakfast + proteinsDinner + proteinsLunch + proteinsSnacks
      );

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

  useEffect(() => {
    maxCarbs - carbs < 0 ? setCarbsColor("danger") : setCarbsColor("success");
    maxProteins - proteins < 0
      ? setProteinsColor("danger")
      : setProteinsColor("success");
    maxFats - fats < 0 ? setFatsColor("danger") : setFatsColor("success");
  }, [maxCarbs - carbs, maxProteins - proteins, maxFats - fats]);

  return (
    <div className="MacrosChart container d-flex mb-3 justify-content-center text-center w-50 mt-4">
      <div className="col-3">
        <p className="text-secondary h6 p-0 m-0">Carbs</p>
        <p className="p-0 mb-2">
          <small>
            <b>{carbs}g</b> / {maxCarbs}g
          </small>
        </p>
        <ProgressBar variant={carbsColor} now={carbs} max={maxCarbs} />
      </div>

      <div className="col-3 mx-3">
        <p className="text-secondary h6 p-0 m-0">Proteins</p>
        <p className="p-0 mb-2">
          <small>
            <b>{proteins}g</b> / {maxProteins}g
          </small>
        </p>
        <ProgressBar variant={proteinsColor} now={proteins} max={maxProteins} />
      </div>

      <div className="col-3">
        <p className="text-secondary h6 p-0 m-0">Fats</p>
        <p className="p-0 mb-2">
          <small>
            <b>{fats}g</b> / {maxFats}g
          </small>
        </p>
        <ProgressBar variant={fatsColor} now={fats} max={maxFats} />
      </div>
    </div>
  );
}

export default MacrosChart;
