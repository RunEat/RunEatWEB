import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { getDiary } from '../../services/DiaryService';
// import Meal from '../Meal/Meal';
// import Sport from '../Sport/Sport';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Diary.css";

const Diary = () => {
    const [date, setDate] = useState(new Date());
    const [diary, setDiary] = useState()
    //console.log('context date prev toISOString()', date)
    
    //let newDate = date.toISOString().setUTCDate()
    //newDate.toISOString()
    
    date.setHours(date.getHours() + 4)
    let newDate= date.toISOString()
    console.log('newDate', newDate)

    //console.log("newDate", newDate);
    
    useEffect(() => {
      console.log('newDate useEffect', newDate)
      getDiary(newDate)
        .then((diaryDB) => {
          //setDate(newDate)  ---- Solucionar actualizar estado de Date
          setDiary(diaryDB)
        })
    }, [newDate]);

    const onChange = (date) => {
      setDate(date);
    };

  console.log('date', date)

  // useEffect(() => {
  //   // if (meal) {
  //   getMeal(mealDate).then((meal) => {
  //     setMeal(meal);
  //     //console.log('meal MealComponent', meal)
  //   });
  // }, [mealDate]);

    console.log('date', date);

  const onClickMeal = () => {
    // getMeal(newDate)
    //   .then()
  }
 
  return (
    !newDate ? (
        <p>Loading</p>
    ) : (
      <div>
          <Calendar onChange={onChange} value={date} />
          {!diary ? ('create new Meal con newDate') :  (
            <>
            <p>Total calories: </p>

            <button onClick={onClickMeal}>Add Meal/ Edit Meal</button>
            {/* getMeal(newDate) 1.Exista que me lo muestres en la vista de Meal 2. No exista, vista Meal vacia que yo puedo añadir  */}
            {/* <Link to={`/meal/${diary.meal}`}>Meal</Link> */}

            <br></br>

            {/* <Link to={`/sport/${diary.sport}`}>Sport</Link> */}

            <br></br>
            </>
          )}

        <Link to="/">Back to home</Link>
      </div> 
      )
    );

}

export default Diary;
