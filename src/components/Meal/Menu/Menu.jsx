import { Carousel } from 'bootstrap';
import Mealtype from './Mealtype'
import React, { useEffect, useState } from 'react';
import { getBreakfast } from '../../../services/RecipeService';

function Menu() {

const [mealtype, setMealtype] = useState()
const [query, setQuery] = useState()

useEffect(() => {
    getBreakfast()
        .then((recipes) => {
            setMealtype(recipes)
        })
}, [])
    
console.log (mealtype)

    return (
        <div className="Menu">
            {
                !mealtype ? (<p>Loading..</p>) : (
                <>
                    <h2>Breakfast</h2>
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