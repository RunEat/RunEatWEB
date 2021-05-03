import Recipe from './Recipe';
import SyncLoader from 'react-spinners/SyncLoader';

const Mealtype = ({ recipes, mealtype, setMeal }) => {

    return (
      <div className="Carousel card-group">
        {!recipes ? (
          <div className="text-center">
            <SyncLoader color="#00bd56" />
          </div>
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