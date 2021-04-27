import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';

function Mealtype({ recipes, mealtype }) {

    return (
      <div className="Carousel card-group">
        {!recipes ? (
          <p>Loading..</p>
        ) : (
          recipes.map((recipe) => (
            <div className="card" key={recipe.recipe.label}>
              <Recipe key={recipe.label} recipe={recipe} mealtype={mealtype} />
            </div>
          ))
        )}
      </div>
    );
}

export default Mealtype;