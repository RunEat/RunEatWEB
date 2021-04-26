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
        search: '',
        show: false
     });

    useEffect(() => {
      getBreakfast(search.search).then((recipes) => {
        setBreakfast(recipes);
      });
      getLunch(search.search).then((recipes) => {
        setLunch(recipes);
      });
      getDinner(search.search).then((recipes) => {
        setDinner(recipes);
      });
      getSnacks(search.search).then((recipes) => {
        setSnacks(recipes);
      });  

    }, []);

  const onSubmit = (e) => {
    e.preventDefault();
      console.log("input", search);
      
    setSearch(prevState => ({
        ...prevState,
        show: true
    }))

      getBreakfast(search.search)
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
    console.log("value", value);

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
          name="search__recipe"
          id="search__recipe"
          placeholder="Search recipe..."
          autoComplete="off"
          onChange={onChange}
          value={search.search}
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
      {!breakfast ? (
        <p>Loading..</p>
      ) : (
        <>
            <h2>Breakfast</h2>
          <Mealtype recipes={breakfast} />
          <h2>Lunch</h2>
            <Mealtype recipes={lunch}/>
          <h2 >Dinner</h2>
          <Mealtype recipes={dinner}/>
          <h2>Snacks</h2>
          <Mealtype recipes={snacks}/>
        </>
      )}
    </div>
  );
}

export default Menu;
