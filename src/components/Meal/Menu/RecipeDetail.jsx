import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { getRecipe } from "../../../services/RecipeService";
import { useParams, useLocation } from "react-router-dom";
import { addMeal } from "../../../services/MealService";
import { getStoredDate } from "../../../store/DateStore";
import SyncLoader from "react-spinners/SyncLoader";
import './RecipeDetail.css'
import Navbar from "../../Navbar/Navbar";

//import { useDate } from "../../../hooks/useDateContext";

const RecipeDetail = () => {
  //const { date, setDate } = useDate();

  const { mealtype } = useLocation();
  //console.log("mealtype", mealtype.mealtype);

  //console.log('mealtype recipeDetail', param1)

  const [redirect, setRedirect] = useState(false)

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

  let mealDate = getStoredDate()

  // const addDate = () => {
  //   // let date = new Date();
  //   return date.toISOString();
  // };

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
        date: mealDate,
        mealType: [mealtype.mealtype],
        dietLabel: recipe.data[0].dietLabels,
        instructions: recipe.data[0].url,
      });
    });
  }, [id]);

  //console.log("recipe", recipe);

  const onClick = () => {
    addMeal(recipe)
    .then((meal) => {
      setRedirect(true)
      //setDate(meal.date);
      //console.log(meal);
    });
  };
  
  if (redirect) {
    return <Redirect to="/meal"/>
  }
  
  return (
    <div className="RecipeDetail">
      {!recipe ? (
        <div className="text-center">
          <SyncLoader color="#3ec4fc" />
        </div>
      ) : (
        <>
          <img className="w-100" src={recipe.image}></img>
          <Link to="/meal" className="iconBack fs-1">
            <i className="fas fa-chevron-left ms-4 colorLink"></i>
          </Link>
          <div className="text-center">
            <button className="btnAddMenu w-50 fs-3" onClick={onClick}>
              Add to menu
            </button>
          </div>

          <div className="container text-center">
            <h1>{recipe.name}</h1>
            {recipe.dietLabel.map((dietLabel, i) => (
              <p key={i} className="d-inline dietLabelTag ms-2 p-1">
                {dietLabel}
              </p>
            ))}
            <h4 className="mt-5">Ingredients:</h4>
            <div className="ingredients pt-3">
              <ul>
                {recipe.ingredients.map((ingredientLine, i) => (
                  <li key={i}>{ingredientLine}</li>
                ))}
              </ul>
            </div>

            <h4 className="mt-5 mb-3">Nutritional information:</h4>
            <p>Calories: ....................... {recipe.calories} cal</p>

            <p>Carbohidrates: ................... {recipe.macros.carbs}g</p>
            <p>
              Proteins: .............................. {recipe.macros.proteins}g
            </p>
            <p>
              Fats: .................................. {recipe.macros.fats}g
            </p>

            <h4 className="font-weight-bold mt-5">How to prepare it:</h4>
            <div className="embed-responsive embed-responsive-16by9 mb-5">
              <iframe
                className="embed-responsive-item w-100 iframeRecipe mb-5"
                src={recipe.instructions.substring(5)}
                title="Cook recipe"
              ></iframe>
            </div>
          </div>
          <>
            <Navbar />
          </>
        </>
      )}
    </div>
  );
};

export default RecipeDetail;
