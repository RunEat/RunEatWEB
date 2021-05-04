import Recipe from './Recipe';
import SyncLoader from 'react-spinners/SyncLoader';
import './Mealtype.css'

import React, { useState } from "react";
import ItemsCarousel from "react-items-carousel";

const Mealtype = ({ recipes, mealtype, setMeal }) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
  
  return (
    <div className="Carousel card-group">
      {!recipes ? (
          <div className="text-center">
            <SyncLoader color="#00bd56" />
          </div>
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