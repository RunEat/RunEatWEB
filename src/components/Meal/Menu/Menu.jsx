import Mealtype from "./Mealtype";
import React, { useEffect, useState } from "react";
import { getBreakfast, getDinner, getLunch, getSnacks } from "../../../services/RecipeService";

function Menu() {
    // const [mealtype, setMealtype] = useState();
    const [breakfast, setBreakfast] = useState();
    const [lunch, setLunch] = useState();
    const [dinner, setDinner] = useState();
    const [snacks, setSnacks] = useState()
    
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

  const onSubmit = (e) => {
    e.preventDefault();
    const { id } = e.target
    console.log("id", e.target);
      
    setSearch(prevState => ({
        ...prevState,
        show: true
    }))

      getBreakfast(search.search.breakfast)
        .then((recipes) => {
            //setMealtype(recipes);
        })
        .finally(() => 
            setSearch(prevState => ({
                ...prevState,
                show: false
            }))
        );
  };

  const onChange = (e) => {
    const { value } = e.target;
    //console.log("value", value);

    setSearch((prevState) => ({
      ...prevState,
      search: value,
    }));
  };

  //console.log ('mealtype', mealtype)

  return (
    <div className="Menu">
      <h2>Breakfast</h2>
      <form onSubmit={onSubmit}>
        <input
          type="search"
          className="form-control mb-2"
          name="search__breakfast"
          id="search__breakfast"
          placeholder="Search recipe..."
          autoComplete="off"
          onChange={onChange}
          value={search.search.breakfast}
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
      <Mealtype recipes={breakfast} />

      <h2>Lunch</h2>
      <form onSubmit={onSubmit}>
        <input
          type="search"
          className="form-control mb-2"
          name="search__lunch"
          id="search__lunch"
          placeholder="Search recipe..."
          autoComplete="off"
          onChange={onChange}
          value={search.search.lunch}
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
      <Mealtype recipes={lunch} />

      <h2>Dinner</h2>
      <form onSubmit={onSubmit}>
        <input
          type="search"
          className="form-control mb-2"
          name="search__dinner"
          id="search__dinner"
          placeholder="Search recipe..."
          autoComplete="off"
          onChange={onChange}
          value={search.search.dinner}
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
      <Mealtype recipes={dinner} />

      <h2>Snacks</h2>
      <form onSubmit={onSubmit}>
        <input
          type="search"
          className="form-control mb-2"
          name="search__snacks"
          id="search__snacks"
          placeholder="Search recipe..."
          autoComplete="off"
          onChange={onChange}
          value={search.search.snacks}
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
      <Mealtype recipes={snacks} />
    </div>
  );
}

export default Menu;
