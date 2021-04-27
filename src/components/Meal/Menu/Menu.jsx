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

  const onSubmitBreakfast = (e) => {
    e.preventDefault();
    // const { id } = e.target
    // console.log("e.target", e.target.id);
      
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

  //console.log ('mealtype', mealtype)

  return (
    // recetaenBD ? (receta añadir botón eliminar receta) : 
    <div className="Menu container">
      <h2>Breakfast</h2>
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
      <Mealtype recipes={breakfast} />

      <h2>Lunch</h2>
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
      <Mealtype recipes={lunch} />

      <h2>Dinner</h2>
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
      <Mealtype recipes={dinner} />

      <h2>Snacks</h2>
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
      <Mealtype recipes={snacks} />
    </div>
  );
}

export default Menu;
