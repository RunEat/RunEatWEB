import Mealtype from "./Mealtype";
import React, { useEffect, useState } from "react";
import { getBreakfast, getDinner, getLunch, getSnacks } from "../../../services/RecipeService";
import { useDate } from '../../../hooks/useDateContext';
import { addMeal, editMeal, getMeal } from "../../../services/MealService";
import { getStoredDate } from "../../../store/DateStore";
import SyncLoader from 'react-spinners/SyncLoader';

const Menu = ({meal, setMeal}) => {
  const { date, setDate } = useDate()
  //console.log('meal', meal)

    const [breakfast, setBreakfast] = useState();
    const [lunch, setLunch] = useState();
    const [dinner, setDinner] = useState();
    const [snacks, setSnacks] = useState();
    
    const [search, setSearch] = useState({
        search: {
            breakfast: '',
            lunch: '',
            dinner: '',
            snacks: ''
        },
        show: false
     });

    useEffect(() => {
      getBreakfast(search.search.breakfast).then((recipes) => {
        setBreakfast(recipes);
      });
      getLunch(search.search.lunch).then((recipes) => {
        setLunch(recipes);
      });
      getDinner(search.search.dinner).then((recipes) => {
        setDinner(recipes);
      });
      getSnacks(search.search.snacks).then((recipes) => {
        setSnacks(recipes);
      });  

    }, []);

  const onSubmitBreakfast = (e) => {
    e.preventDefault();
      
    setSearch(prevState => ({
      ...prevState,
      show: true
    }))

    getBreakfast(search.search.breakfast)
      .then((recipes) => {
        setBreakfast(recipes);
      })
      .finally(() =>
        setSearch(prevState => ({
          ...prevState,
          show: false
        }))
      );
  }

  const onSubmitLunch = (e) => {
    e.preventDefault();

    setSearch(prevState => ({
      ...prevState,
      show: true
    }))
    
    getLunch(search.search.lunch)
    .then((recipes) => {
        setLunch(recipes);
    })
    .finally(() => 
        setSearch(prevState => ({
            ...prevState,
            show: false
        }))
    );
    
  }
    
  const onSubmitDinner = (e) => {
    e.preventDefault();

    setSearch(prevState => ({
      ...prevState,
      show: true
    }))
    
    getDinner(search.search.dinner)
      .then((recipes) => {
        setDinner(recipes);
      })
      .finally(() =>
        setSearch(prevState => ({
          ...prevState,
          show: false
        }))
      );
  }
        
  const onSubmitSnacks = (e) => {
    e.preventDefault();

    setSearch(prevState => ({
      ...prevState,
      show: true
    }))

   getSnacks(search.search.snacks)
     .then((recipes) => {
       setSnacks(recipes);
     })
     .finally(() =>
       setSearch(prevState => ({
         ...prevState,
         show: false
       }))
     );
  }
  
  const onChange = (e) => {

    let value = e.target.value;

    setSearch((prevState) => {
      return { ...prevState, search: { [e.target.id]: value }};
    })
  };

  let mealDate = getStoredDate();

  const deleteRecipe = (e) => {
    //console.log(e.target.id)
    if (e.target.id === "breakfast" && meal) {
      editMeal(mealDate, "breakfast").then((updatedMeal) => {
        //console.log("updatedMeal", updatedMeal);
        setMeal(updatedMeal);
      });
    }
    if (e.target.id === "lunch" && meal) {
      editMeal(mealDate, "lunch").then((updatedMeal) => {
        //console.log("updatedMeal", updatedMeal);
        setMeal(updatedMeal);
      });
    }
    if (e.target.id === "dinner" && meal) {
      editMeal(mealDate, "dinner").then((updatedMeal) => {
        //console.log("updatedMeal", updatedMeal);
        setMeal(updatedMeal);
      });
    }
    if (e.target.id === "snacks" && meal) {
      editMeal(mealDate, "snacks").then((updatedMeal) => {
        //console.log("updatedMeal", updatedMeal);
        setMeal(updatedMeal);
      });
    }
  }

  //console.log ('mealtype', mealtype)

  return (
    <div className="Menu container">
      {!date ? (
        <div className="text-center">
          <SyncLoader color="#00bd56" />
        </div>
      ) : (
        <>
          <h2>Breakfast</h2>
          {meal !== undefined && meal.mealType.breakfast ? ( //deleteRecipe(setState que deje la receta vacia)
            <>
              <h3>{meal.mealType.breakfast.name}</h3>
              <img
                className="w-25"
                src={meal.mealType.breakfast.image}
                alt={meal.mealType.breakfast.name}
              ></img>
              <button
                id="breakfast"
                className="btn btn-danger"
                onClick={deleteRecipe}
              >
                Delete recipe
              </button>
            </>
          ) : (
            <>
              <form className="mb-3" onSubmit={onSubmitBreakfast} id="helloId">
                <input
                  type="search"
                  className="form-control mb-2"
                  name="search__breakfast"
                  id="breakfast"
                  placeholder="Search recipe..."
                  autoComplete="off"
                  onChange={onChange}
                  value={search.search.breakfast}
                />
                <button type="submit" className="btn btn-primary">
                  Search
                </button>
              </form>
              <Mealtype
                recipes={breakfast}
                mealtype="breakfast"
                setMeal={setMeal}
              />
            </>
          )}

          <h2>Lunch</h2>
          {meal !== undefined && meal.mealType.lunch ? (
            <>
              <h3>{meal.mealType.lunch.name}</h3>
              <img
                className="w-25"
                src={meal.mealType.lunch.image}
                alt={meal.mealType.lunch.name}
              ></img>
              <button
                id="lunch"
                className="btn btn-danger"
                onClick={deleteRecipe}
              >
                Delete recipe
              </button>
            </>
          ) : (
            <>
              <form onSubmit={onSubmitLunch}>
                <input
                  type="search"
                  className="form-control mb-2"
                  name="search__lunch"
                  id="lunch"
                  placeholder="Search recipe..."
                  autoComplete="off"
                  onChange={onChange}
                  value={search.search.lunch}
                />
                <button type="submit" className="btn btn-primary">
                  Search
                </button>
              </form>
              <Mealtype recipes={lunch} mealtype="lunch" setMeal={setMeal} />
            </>
          )}

          <h2>Dinner</h2>
          {meal !== undefined && meal.mealType.dinner ? (
            <>
              <h3>{meal.mealType.dinner.name}</h3>
              <img
                className="w-25"
                src={meal.mealType.dinner.image}
                alt={meal.mealType.dinner.name}
              ></img>
              <button
                id="dinner"
                className="btn btn-danger"
                onClick={deleteRecipe}
              >
                Delete recipe
              </button>
            </>
          ) : (
            <>
              <form onSubmit={onSubmitDinner}>
                <input
                  type="search"
                  className="form-control mb-2"
                  name="search__dinner"
                  id="dinner"
                  placeholder="Search recipe..."
                  autoComplete="off"
                  onChange={onChange}
                  value={search.search.dinner}
                />
                <button type="submit" className="btn btn-primary">
                  Search
                </button>
              </form>
              <Mealtype recipes={dinner} mealtype="dinner" setMeal={setMeal} />
            </>
          )}

          <h2>Snacks</h2>
          {meal !== undefined && meal.mealType.snacks ? (
            <>
              <h3>{meal.mealType.snacks.name}</h3>
              <img
                className="w-25"
                src={meal.mealType.snacks.image}
                alt={meal.mealType.snacks.name}
              ></img>
              <button
                id="snacks"
                className="btn btn-danger"
                onClick={deleteRecipe}
              >
                Delete recipe
              </button>
            </>
          ) : (
            <>
              <form onSubmit={onSubmitSnacks}>
                <input
                  type="search"
                  className="form-control mb-2"
                  name="search__snacks"
                  id="snacks"
                  placeholder="Search recipe..."
                  autoComplete="off"
                  onChange={onChange}
                  value={search.search.snacks}
                />
                <button type="submit" className="btn btn-primary">
                  Search
                </button>
              </form>
              <Mealtype recipes={snacks} mealtype="snacks" setMeal={setMeal} />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Menu;
