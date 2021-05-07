import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getMeal } from "../../services/MealService";
import { useDate } from "../../hooks/useDateContext";
import { setStoredDate } from "../../store/DateStore";
import { getDiary } from "../../services/DiaryService";
const Navbar = () => {
  const { date, setDate } = useDate();
  const [meal, setMeal] = useState();
  const [sport, setSport] = useState();
  let today = new Date();
  const onClickMeal = () => {
    getMeal(today).then((meal) => {
      setMeal(meal);
    });
    setDate(today);
    setStoredDate(today);
  };
  const onClickSport = () => {
    getDiary(today).then((diary) => {
      setSport(diary.sport);
    });
    setDate(today)
    setStoredDate(today)
  }
  return (
    <div>
      <nav
        className="navbar fixed-bottom d-flex justify-content-around "
        style={{ backgroundColor: "#00BD56"}}
      >
        <Link className="text-white" to="/profile">
          <i className="fas fa-user-alt ms-1" style={{ fontSize: "2.2rem" }}></i>
        </Link>
        <Link className="text-white" to="/diary">
          <i className="far fa-calendar-alt p-3" style={{ fontSize: "2.2rem" }}></i>
        </Link>
        <Link className="text-white" to="/sport" onClick={onClickSport}>
          <i className="fas fa-running p-3" style={{ fontSize: "2.2rem" }}></i>
        </Link>
        <Link className="text-white" to="/meal" onClick={onClickMeal}>
          <i className="fas fa-utensils p-3" style={{ fontSize: "2.2rem" }}></i>
        </Link>
      </nav>
    </div>
  );
};
export default Navbar;