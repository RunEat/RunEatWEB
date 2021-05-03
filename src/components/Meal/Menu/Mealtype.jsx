import Recipe from './Recipe';
import './Mealtype.css'

// const Mealtype = ({ recipes, mealtype, setMeal }) => {

//     return (
//       // <div className="Carousel card-group">
//       //   {!recipes ? (
//       //     <p>Loading..</p>
//       //   ) : (
//       //     recipes.map((recipe) => (
//       //       <div className="card" key={recipe.recipe.label}>
//       //         <Recipe
//       //           key={recipe.label}
//       //           recipeFromAPI={recipe}
//       //           mealtype={mealtype}
//       //           setMeal={setMeal}
//       //         />
//       //       </div>
//       //     ))
//       //   )}
//       // </div>

      
//     );
// }

// export default Mealtype;

// ---------

import React, { useState } from "react";
import ItemsCarousel from "react-items-carousel";

const Mealtype = ({ recipes, mealtype, setMeal }) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
  
  return (
    <div className="Carousel card-group">
      {!recipes ? (
        <p>Loading..</p>
      ) : (
        <div style={{ padding: `0 ${chevronWidth}px` }}>
          <ItemsCarousel
            requestToChangeActive={setActiveItemIndex}
            activeItemIndex={activeItemIndex}
            numberOfCards={1.5}
            gutter={0}
            leftChevron={
              <button className="carouselButton mb-5">
                <i class="fas fa-arrow-left"></i>
              </button>
            }
            rightChevron={
              <button className="carouselButton mb-5">
                <i class="fas fa-arrow-right"></i>
              </button>
            }
            placeholderItem="Hello"
            chevronWidth={chevronWidth}
          >
            {recipes.map((recipe) => (
              <div
                style={{ background: "white" }}
                key={recipe.recipe.label}
                className="d-flex align-items-start justify-content-start"
              >
                <Recipe
                  key={recipe.label}
                  recipeFromAPI={recipe}
                  mealtype={mealtype}
                  setMeal={setMeal}
                />
              </div>
            ))}
          </ItemsCarousel>
        </div>
      )}
    </div>
  );
};

export default Mealtype;