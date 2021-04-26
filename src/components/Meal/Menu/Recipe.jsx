import React from 'react';

function Recipe({ recipe }) {
    
    //console.log('recipeInRecipeComponent', recipe)
    
    return (
        <div className="Recipe">
        {
            !recipe ? (<p>Loading..</p>)
            : (
                <>        
                    <img className="w-75" src={recipe.recipe.image}/>
                    <p>Name: {recipe.recipe.label}</p>
                </>
            )
        }
        </div> 
    );
}

export default Recipe;