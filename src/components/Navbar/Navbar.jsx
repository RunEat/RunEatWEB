import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getMeal } from "../../services/MealService";
import { useDate } from "../../hooks/useDateContext";
import { setStoredDate } from "../../store/DateStore";

const Navbar = () => {
  const { date, setDate } = useDate();
  const [meal, setMeal] = useState();

  const onClick = () => {
    let today = new Date();
    getMeal(today).then((meal) => {
      setMeal(meal);
    });
    setDate(today);
    setStoredDate(today);
  };

  return (
    <div>
      <nav
        className="navbar fixed-bottom d-flex justify-content-around"
        style={{ backgroundColor: "#00bd56" }}
      >
        <Link className="text-white" to="/profile">
          <i class="fas fa-home p-3" style={{ fontSize: "2.2rem" }}></i>
        </Link>

        <Link className="text-white" to="/diary">
          <i class="far fa-calendar-alt p-3" style={{ fontSize: "2.2rem" }}></i>
        </Link>

        <Link className="text-white" to="/sport">
          <i class="fas fa-running p-3" style={{ fontSize: "2.2rem" }}></i>
        </Link>

        <Link className="text-white" to="/meal" onClick={onClick}>
          <i class="fas fa-utensils p-3" style={{ fontSize: "2.2rem" }}></i>
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
