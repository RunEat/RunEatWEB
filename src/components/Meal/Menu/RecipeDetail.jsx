import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRecipe } from '../../../services/RecipeService.js'
import { useParams } from "react-router-dom";

const RecipeDetail = (props) => {
	console.log('props', props)
	const [recipe, setRecipe] = useState();
	const {id} = useParams();

	useEffect(() => {
		getRecipe(id)
			.then(recipe => {
				console.log('response', recipe)
				setRecipe(recipe)
			})
	}, [id])

	return (
		<div className="RecipeDetail">
		Recipe detail
		{
				!recipe ? (<p>Loading..</p>)
				: (
						<>        
							<h1>Recipe Detail</h1>
							<img className="w-75" src={recipe[0].recipe.image}/>
							<p>Name: {recipe[0].recipe.label}</p>
							
							<Link>Back to menu</Link>
						</>
				)
		}
		</div> 
	);
};

export default RecipeDetail;