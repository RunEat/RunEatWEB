import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRecipe } from "../../../services/RecipeService";
import { useParams, useLocation } from "react-router-dom";
import { addMeal } from "../../../services/MealService";

import { useDate } from "../../../hooks/useDateContext";

const RecipeDetail = () => {
  const { date, setDate } = useDate();

  const { mealtype } = useLocation();
  console.log("mealtype", mealtype.mealtype);

  //console.log('mealtype recipeDetail', param1)

  const [recipe, setRecipe] = useState({
    name: "",
    macros: {
      carbs: "",
      proteins: "",
      fats: "",
    },
    calories: "",
    ingredients: [],
    date: "",
    mealType: [],
    dietLabel: [],
    instructions: "",
  });

  const { id } = useParams();

  const addDate = () => {
    let date = new Date();
    return date.toISOString();
  };

  // const mealTypeTransform = (mealtype) => {
  // 	if (mealtype.includes('/')) {
  // 		return mealtype.split('/')[0]
  // 	} else {
  // 		return mealtype[0]
  // 	}
  // }

  // mealTypeTransform(['lunch/dinner'])
  // mealTypeTransform(['dinner'])

  useEffect(() => {
    getRecipe(id).then((recipe) => {
      setRecipe({
        name: recipe.data[0].label,
        image: recipe.data[0].image,
        macros: {
          carbs: recipe.data[0].totalNutrients.CHOCDF.quantity.toFixed(0),
          proteins: recipe.data[0].totalNutrients.PROCNT.quantity.toFixed(0),
          fats: recipe.data[0].totalNutrients.FAT.quantity.toFixed(0),
        },
        calories: recipe.data[0].calories.toFixed(0),
        ingredients: recipe.data[0].ingredientLines,
        date: addDate(),
        mealType: [mealtype.mealtype],
        dietLabel: recipe.data[0].dietLabels,
        instructions: recipe.data[0].url,
      });
    });
  }, [id]);

  console.log("recipe", recipe);

  const onClick = () => {
    addMeal(recipe).then((meal) => {
      setDate(meal.date);
      console.log(meal);
    });
  };

  return (
    <div className="RecipeDetail">
      Recipe detail
      {!recipe ? (
        <p>Loading..</p>
      ) : (
        <>
          <h1>Recipe Detail</h1>
          <img className="w-75" src={recipe.image} />
          <p>Name: {recipe.name}</p>
          <p>Diet label:</p>
          {recipe.dietLabel.map((dietLabel, i) => (
            <p key={i}>{dietLabel}</p>
          ))}
          <p>Ingredients:</p>
          <ul>
            {recipe.ingredients.map((ingredientLine, i) => (
              <li key={i}>{ingredientLine}</li>
            ))}
          </ul>

          <p>Calories: {recipe.calories} cal</p>

          <p>Carbohidrates: {recipe.macros.carbs}g</p>
          <p>Proteins: {recipe.macros.proteins}g</p>
          <p>Fats: {recipe.macros.fats}g</p>

          <h4 className="font-weight-bold">How to prepare it:</h4>
          {/* <div className="embed-responsive embed-responsive-16by9">
								<iframe className="embed-responsive-item w-75" src={recipe.instructions} title="Cook recipe"></iframe>
							</div> */}

          <button className="btn btn-success" onClick={onClick}>
            Add to menu
          </button>
          <Link to="/meal">Back to menu</Link>
        </>
      )}
    </div>
  );
};

export default RecipeDetail;
