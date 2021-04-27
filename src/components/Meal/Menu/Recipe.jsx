import React from 'react';
import { Link } from 'react-router-dom';

function Recipe({ recipe }) {
    
    //console.log('uri', recipe.recipe.uri)
    let slicedUri = recipe.recipe.uri.split('_')[1]
    console.log('slicedUri', slicedUri)

    return (
        <div className="Recipe">
        {
            !recipe ? (<p>Loading...</p>)
            : (
                <>        
                    <Link to={`/recipe_detail/${slicedUri}`}>
                        <img className="w-75" src={recipe.recipe.image}/>
                        <p>Name: {recipe.recipe.label}</p>
                    </Link>
                    
                    <button type="btn">ADD TO MENU</button>
                </>
            )
        }
        </div> 
    );
}

export default Recipe;