import { Carousel } from 'bootstrap';
import Mealtype from './Mealtype'
import React, { useEffect, useState } from 'react';
import { getBreakfast } from '../../../services/RecipeService';

function Menu() {

const [mealtype, setMealtype] = useState()
const [query, setQuery] = useState()
const [search, setSearch] = useState(' ')


useEffect(() => {
    
})

const onSubmit = (e) => {
    e.preventDefault();
    console.log('input', search)
    
    getBreakfast(search)
        .then((recipes) => {
            setMealtype(recipes)
        }) 
}

const onChange = (e) => {
    const { value } = e.target
    console.log('value', value)

    setSearch(value)

}
    
//console.log ('mealtype', mealtype)

    return (
        <div className="Menu">
            {
                !search ? (<p>Loading..</p>) : (
                <>
                    <h2>Breakfast</h2>
                    <form onSubmit={onSubmit}>    
                    <input 
                        type="search" className="form-control mb-2" name="search__recipe"
                        id="search__recipe" placeholder="Search recipe..." autoComplete="off"
                        onChange={onChange} value={search}
                    />
                    <button type="submit" className="btn btn-primary">Search</button>
                    </form> 
                    <Mealtype recipes={mealtype}/>
                    <h2>Lunch</h2>
                    <Mealtype />
                    <h2>Dinner</h2>
                    <Mealtype />
                    <h2>Snacks</h2>
                    <Mealtype />
                </>
                )
            }
        </div>
    );
}

export default Menu;