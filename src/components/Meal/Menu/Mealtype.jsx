import Recipe from "./Recipe";
import SyncLoader from "react-spinners/SyncLoader";
import "./Mealtype.css";

import React, { useState } from "react";
import ItemsCarousel from "react-items-carousel";

const Mealtype = ({ recipes, mealtype, setMeal }) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;

  return (
    <div className="Carousel card-group">
      {!recipes ? (
        <div className="text-center pb-3">
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
              <button
                className="carouselButton mb-5 w-100 font-weight-bold"
                style={{ color: "#ff9d20", marginRight: "5rem", fontSize: '3rem'}}
              >
                <i className="fas fa-caret-left"></i>
              </button>
            }
            rightChevron={
              <button
                className="carouselButton mb-5 w-100 font-weight-bold"
                style={{ color: "#ff9d20", marginLeft: "5rem", fontSize: '3rem'}}
              >
                <i className="fas fa-caret-right"></i>
              </button>
            }
            placeholderitem="Hello"
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
