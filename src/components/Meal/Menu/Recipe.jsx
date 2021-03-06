import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addMeal, getMeal } from "../../../services/MealService";
import { getStoredDate } from "../../../store/DateStore";
//import { useDate } from "../../../hooks/useDateContext";
//import { getRecipe } from "../../../services/RecipeService";
import "./Recipe.css";

const Recipe = ({ recipeFromAPI, mealtype, setMeal }) => {
  //console.log("mealtype recipe", mealtype);
  let id = recipeFromAPI.recipe.uri.split("_")[1]; // Slice Uri from object to us recipe id

  let mealDate = getStoredDate();

  const onClick = (e) => {
    if (recipeFromAPI.recipe.uri == e.target.id) {
      const newRecipe = {
        name: recipeFromAPI.recipe.label,
        image: recipeFromAPI.recipe.image,
        macros: {
          carbs: recipeFromAPI.recipe.totalNutrients.CHOCDF.quantity.toFixed(0),
          proteins: recipeFromAPI.recipe.totalNutrients.PROCNT.quantity.toFixed(
            0
          ),
          fats: recipeFromAPI.recipe.totalNutrients.FAT.quantity.toFixed(0),
        },
        calories: recipeFromAPI.recipe.calories.toFixed(0),
        ingredients: recipeFromAPI.recipe.ingredientLines,
        date: mealDate,
        mealType: [mealtype],
        dietLabel: recipeFromAPI.recipe.dietLabels,
        instructions: recipeFromAPI.recipe.url,
      };
      console.log('newRecipe', newRecipe)
      addMeal(newRecipe).then((meal) => {
        getMeal(mealDate).then((updateMeal) => {
          console.log("updateMeal", updateMeal);
          setMeal(updateMeal);
        });
        //console.log(meal);
      });
    }
  };

  const newTo = {
    pathname: `/recipe_detail/${id}`,
    mealtype: { mealtype },
  };

  return (
    <div className="Recipe bg-white text-center">
      {!recipeFromAPI ? (
        <p>Loading...</p>
      ) : (
        <>
          <Link to={newTo} className="text-decoration-none">
            <img className="imgRecipe" src={recipeFromAPI.recipe.image} />
            <h2 className="w-75 ms-4 mt-4 titleRecipe">
              {recipeFromAPI.recipe.label}
            </h2>
          </Link>

          <button
            id={recipeFromAPI.recipe.uri}
            className="btn btnAddMenu fs-6"
            onClick={onClick}
          >
            Add to menu
          </button>
        </>
      )}
    </div>
  );
};

export default Recipe;
