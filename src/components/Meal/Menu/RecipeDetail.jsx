import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRecipe } from '../../../services/RecipeService.js'
import { useParams } from "react-router-dom";

const RecipeDetail = (props) => {
	console.log('props', props)
	const [recipe, setRecipe] = useState();
	const {id} = useParams()

	console.log('id', id)

	useEffect(() => {
		getRecipe(id)
			.then(recipe => {
				setRecipe(recipe)
			})
		}, [id])
	
	// const onSubmit = () => {
	// 	useEffect(() => {
			
	// 	})
	// }

		return (
		<div className="RecipeDetail">
		Recipe detail
		{
				!recipe ? (<p>Loading..</p>)
				: (
						<>        
							<h1>Recipe Detail</h1>
							<img className="w-75" src={recipe.data[0].image}/>
							<p>Name: {recipe.data[0].label}</p>
							<p>Diet label:
							{
								recipe.data[0].dietLabels.map((dietLabel, i)=> <p key={i}>{dietLabel}</p>)
							}
							</p>
							<p>Ingredients:
							<ul>
								{
									recipe.data[0].ingredientLines.map((ingredientLine, i)=> <li key={i}>{ingredientLine}</li>)
								}
							</ul>
							</p>
							
							<p>Calories: {recipe.data[0].calories.toFixed(0)} cal</p>

							<p>Carbohidrates: {recipe.data[0].totalNutrients.CHOCDF.quantity.toFixed(0)}g</p>
							<p>Proteins: {recipe.data[0].totalNutrients.PROCNT.quantity.toFixed(0)}g</p>
							<p>Fats: {recipe.data[0].totalNutrients.FAT.quantity.toFixed(0)}g</p>

							<h4 className="font-weight-bold">How to prepare it:</h4>
							<div className="embed-responsive embed-responsive-16by9">
								<iframe className="embed-responsive-item w-75" src={recipe.data[0].url} title="Cook recipe"></iframe>
							</div>
							
							<button className="btn btn-success">Add to menu</button>
							<Link to='/meal'>Back to menu</Link>
						</>
				)
		}
		</div> 
	);
};

export default RecipeDetail;