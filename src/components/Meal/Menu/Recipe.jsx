import React from 'react';
import { Link } from 'react-router-dom';

function Recipe({ recipe }) {
    
    //console.log('recipeInRecipeComponent', recipe)
    
    return (
        <div className="Recipe">
        {
            !recipe ? (<p>Loading..</p>)
            : (
                <>        
                    <Link to={`/recipe_detail/${recipe.recipe.label}`}>
                        <img className="w-75" src={recipe.recipe.image}/>
                        <p>Name: {recipe.recipe.label}</p>
                    </Link>
                    
                    <button>ADD TO MENU</button>
                </>
            )
        }
        </div> 
    );
}

export default Recipe;