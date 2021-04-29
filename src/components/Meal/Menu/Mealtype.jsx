import Recipe from './Recipe';

const Mealtype = ({ recipes, mealtype, setMeal }) => {

    return (
      <div className="Carousel card-group">
        {!recipes ? (
          <p>Loading..</p>
        ) : (
          recipes.map((recipe) => (
            <div className="card" key={recipe.recipe.label}>
              <Recipe
                key={recipe.label}
                recipeFromAPI={recipe}
                mealtype={mealtype}
                setMeal={setMeal}
              />
            </div>
          ))
        )}
      </div>
    );
}

export default Mealtype;