import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addMeal, getMeal } from '../../../services/MealService';
import { useDate } from "../../../hooks/useDateContext";
//import { getRecipe } from "../../../services/RecipeService";

const Recipe = ({ recipeFromAPI, mealtype, setMeal }) => {
//console.log("mealtype recipe", mealtype);
let id = recipeFromAPI.recipe.uri.split("_")[1]; // Slice Uri from object to us recipe id

const { date, setDate } = useDate();
  
  // useEffect(() => {
  //   setDate(new Date("April 15, 2021 03:24:00")) 
  // },[])

const addDate = () => {
    // let date = new Date();
    return date.toISOString();
};
  
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
        date: addDate(),
        mealType: [mealtype],
        dietLabel: recipeFromAPI.recipe.dietLabels,
        instructions: recipeFromAPI.recipe.url,
      };

      addMeal(newRecipe).then((meal) => {
        getMeal(date).then((updateMeal) => {
          console.log("updateMeal", updateMeal);
          setMeal(updateMeal);
        });
        console.log(meal);
      });
  }
}
    
const newTo = {
    pathname: `/recipe_detail/${id}`,
    mealtype: { mealtype },
};

return (
    <div className="Recipe">
      {!recipeFromAPI ? (
        <p>Loading...</p>
      ) : (
        <>
          <Link to={newTo}>
            <img className="w-75" src={recipeFromAPI.recipe.image} />
            <p>Name: {recipeFromAPI.recipe.label}</p>
          </Link>

          <button id={recipeFromAPI.recipe.uri} className="btn btn-success" onClick={onClick}>Add to menu</button>
        </>
      )}
    </div>
  );
};

export default Recipe;