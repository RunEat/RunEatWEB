import { Carousel } from 'bootstrap';
import Mealtype from './Mealtype'
import React, { useEffect, useState } from 'react';
import { getBreakfast } from '../../../services/RecipeService';

function Menu() {

const [mealType, setMealType] = useState()
const [query, setQuery] = useState()

useEffect(() => {
    getBreakfast(query, input.id)
        .then((response) => console.log (response))
}, [query])

    return (
        <div className="Menu">
            <h2>Breakfast</h2>
            <input id="breakfast"></input>
            <Mealtype />
            <h2>Lunch</h2>
            <Mealtype />
            <h2>Dinner</h2>
            <Mealtype />
            <h2>Snacks</h2>
            <Mealtype />
        </div>
    );
}

export default Menu;