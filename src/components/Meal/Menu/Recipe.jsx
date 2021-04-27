import React from 'react';
import { Link } from 'react-router-dom';

const Recipe = ({ recipe, mealtype }) => {
    
    //console.log('mealtype recipe', mealtype)
    let slicedUri = recipe.recipe.uri.split('_')[1]
    
    const newTo = {
        pathname: `/recipe_detail/${slicedUri}`,
        mealtype: {mealtype}
    }

    return (
        <div className="Recipe">
        {
            !recipe ? (<p>Loading...</p>)
            : (
                <>        
                    <Link to={newTo}>
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