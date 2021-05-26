import React, { useEffect, useState } from "react";
import { maximumCalories } from "../../Utils/CalculateCalories";
import { useUser } from "../../hooks/useUserContext";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./TotalCalories.css";
import SportCalories from "./SportCalories";

const TotalCalories = ({ meal, sport }) => {
  //console.log('Meal totalCalories', meal)
  
  const [maxCalories, setMaxCalories] = useState();
  const [calories, setCalories] = useState(0);
  const [color, setColor] = useState("#198754");
  const [countBurnedCals, setCountBurnedCals] = useState(false);
  
  const { user } = useUser();
  
  useEffect(() => {
    maxCalories - calories < 0 ? setColor("#dc3444") : setColor("#198754");
  }, [maxCalories - calories]);
  
  useEffect(() => {
    if (user) {
      if (countBurnedCals) {
        console.log('if')
        setMaxCalories(Number(maximumCalories(user)) + sport.caloriesBurned);
      } else {
        console.log('else')
        setMaxCalories(maximumCalories(user));
      }
    }
  }, [user, countBurnedCals]);
  
  //console.log("meal", meal);

  useEffect(() => {
    if (meal) {
      let breakfast = meal.mealType.breakfast
        ? meal.mealType.breakfast.calories
        : 0;
      let lunch = meal.mealType.lunch ? meal.mealType.lunch.calories : 0;
      let dinner = meal.mealType.dinner ? meal.mealType.dinner.calories : 0;
      let snacks = meal.mealType.snacks ? meal.mealType.snacks.calories : 0;
      // let caloriesBurned = sport.caloriesBurned

      setCalories(breakfast + lunch + dinner + snacks);
    }
  }, [meal]);

  return (
    <div className="TotalCalories text-center">
      {user ? (
        <>
          {user && <h6 className="mb-3 text-light">Meal Plan · {user.mealPlan}</h6>}
          <CircularProgressbarWithChildren
            value={calories}
            maxValue={maxCalories}
            styles={buildStyles({
              marginTop: '',
              backgroundColor: "#e9ecef",
              trailColor: "#e9ecef",
              pathColor: color,
              
            })}
            style={{position: "relative"}}
            text={maxCalories - calories}
          >
            {maxCalories > calories ? (
              <div className="d-flex flex-column align-items-center" 
                style={{
                  position: "absolute", 
                  top: "5vh", 
                }}>
                <img
                  style={{ width: 40}}
                  src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGNpcmNsZSBzdHlsZT0iZmlsbDojRkZEOTNCOyIgY3g9IjI1NiIgY3k9IjI1NiIgcj0iMjU2Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojM0U0MzQ3OyIgZD0iTTI1Niw0MjAuNTQ0Yy03NC44NjQsMC0xNDAuMDk2LTUwLjcwNC0xNTguNjI0LTEyMy4yOGMtMS40NTYtNS43MTIsMS45ODQtMTEuNTIsNy42OTYtMTIuOTc2DQoJYzUuNjgtMS40ODgsMTEuNTA0LDEuOTg0LDEyLjk2LDcuNjk2YzE2LjEyOCw2My4xMzYsNzIuODQ4LDEwNy4yMzIsMTM3Ljk1MiwxMDcuMjMyczEyMS44NC00NC4wOTYsMTM3Ljk1Mi0xMDcuMjMyDQoJYzEuNDQtNS43MTIsNy4yNDgtOS4xODQsMTIuOTc2LTcuNjk2YzUuNzEyLDEuNDU2LDkuMTUyLDcuMjY0LDcuNjk2LDEyLjk3NkMzOTYuMDk2LDM2OS44NCwzMzAuODY0LDQyMC41NDQsMjU2LDQyMC41NDR6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRjRDNTM0OyIgZD0iTTUxMiwyNTZjMCwxNDEuNDQtMTE0LjY0LDI1Ni0yNTYsMjU2Yy04MC40OCwwLTE1Mi4zMi0zNy4xMi0xOTkuMjgtOTUuMjgNCgljNDMuOTIsMzUuNTIsOTkuODQsNTYuNzIsMTYwLjcyLDU2LjcyYzE0MS4zNiwwLDI1Ni0xMTQuNTYsMjU2LTI1NmMwLTYwLjg4LTIxLjItMTE2LjgtNTYuNzItMTYwLjcyDQoJQzQ3NC44LDEwMy42OCw1MTIsMTc1LjUyLDUxMiwyNTZ6Ii8+DQo8ZWxsaXBzZSBzdHlsZT0iZmlsbDojM0U0MzQ3OyIgY3g9IjE3My4zMjgiIGN5PSIyMjAuMzA0IiByeD0iMzkuMjMyIiByeT0iNDYuNjI0Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojNUE1RjYzOyIgZD0iTTE5MS4wMjQsMjEwLjI3MmMtMy4wNTYsMi40LTguMDgsMS4yMTYtMTEuMjk2LTIuNjg4cy0zLjM3Ni05LjEzNi0wLjMyLTExLjUzNg0KCWMzLjA0LTIuNTEyLDguMDgtMS4zMjgsMTEuMjgsMi41NzZDMTkzLjkyLDIwMi42NCwxOTMuOTUyLDIwNy43NzYsMTkxLjAyNCwyMTAuMjcyeiIvPg0KPGVsbGlwc2Ugc3R5bGU9ImZpbGw6IzNFNDM0NzsiIGN4PSIzMzguNzIiIGN5PSIyMjAuMzA0IiByeD0iMzkuMjMyIiByeT0iNDYuNjI0Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojNUE1RjYzOyIgZD0iTTM1Ni4zODQsMjEwLjI3MmMtMy4wNTYsMi40LTguMDgsMS4yMTYtMTEuMjk2LTIuNjg4cy0zLjM3Ni05LjEzNi0wLjMyLTExLjUzNg0KCWMzLjA0LTIuNTEyLDguMDY0LTEuMzI4LDExLjI4LDIuNTc2QzM1OS4yOCwyMDIuNjQsMzU5LjMxMiwyMDcuNzc2LDM1Ni4zODQsMjEwLjI3MnoiLz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K"
                />
                <div style={{ fontSize: 15, color: "#e9ecef"}} className="mt-5">
                  <strong>kCal left</strong>
                </div>
              </div>
            ) : (
              <>
                <div style={{ fontSize: 15, color: "#dc3444" }}>
                  <strong>excess kCal</strong>
                </div>
                <img
                  style={{ width: 40 }}
                  alt="sad"
                  src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGNpcmNsZSBzdHlsZT0iZmlsbDojRkZEOTNCOyIgY3g9IjI1NiIgY3k9IjI1NiIgcj0iMjU2Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRjRDNTM0OyIgZD0iTTUxMiwyNTZjMCwxNDEuNDQtMTE0LjY0LDI1Ni0yNTYsMjU2Yy04MC40OCwwLTE1Mi4zMi0zNy4xMi0xOTkuMjgtOTUuMjgNCgljNDMuOTIsMzUuNTIsOTkuODQsNTYuNzIsMTYwLjcyLDU2LjcyYzE0MS4zNiwwLDI1Ni0xMTQuNTYsMjU2LTI1NmMwLTYwLjg4LTIxLjItMTE2LjgtNTYuNzItMTYwLjcyDQoJQzQ3NC44LDEwMy42OCw1MTIsMTc1LjUyLDUxMiwyNTZ6Ii8+DQo8Zz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojM0U0MzQ3OyIgZD0iTTMzMi40MzIsMzg0LjhjMCw3LjQ3Mi01Ljk2OCwxMy4zMjgtMTMuMzI4LDEzLjMyOEgxOTIuOTEyYy03LjM2LDAtMTMuMzI4LTUuODcyLTEzLjMyOC0xMy4zMjgNCgkJYzAtNy4zNiw1Ljk2OC0xMy4zMjgsMTMuMzI4LTEzLjMyOGgxMjYuMTkyQzMyNi40NDgsMzcxLjQ3MiwzMzIuNDMyLDM3Ny40NCwzMzIuNDMyLDM4NC44eiIvPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiMzRTQzNDc7IiBkPSJNMTExLjgwOCwyNjEuNjhjNi4yNTYtMy42OCwyNC43NjgsMTYuMTYsNTMuODQsMTcuMjQ4YzMwLjA5NiwxLjEyLDQ3LjU4NC0yMC45MjgsNTMuODQtMTcuMjQ4DQoJCWM3Ljc5MiwyLjY3Mi0yLjgzMiw1My41NTItNTMuODQsNTMuNzQ0QzExNC42NTYsMzE1LjIzMiwxMDQuMDE2LDI2NC4zNTIsMTExLjgwOCwyNjEuNjh6Ii8+DQo8L2c+DQo8cGF0aCBzdHlsZT0iZmlsbDojRTlCMDJDOyIgZD0iTTk5LjgwOCwyMzkuMzEyYy01LjgwOC0wLjkyOC05Ljc3Ni02LjQtOC44MzItMTIuMjI0YzAuOTQ0LTUuODA4LDYuMzItOS43OTIsMTIuMjI0LTguODMyDQoJYzU5Ljk2OCw5LjYzMiw3OC4xOTItMzMuMiw3OC4zNjgtMzMuNjMyYzIuMjA4LTUuNDU2LDguNDE2LTguMDgsMTMuOTA0LTUuODU2YzUuNDU2LDIuMjI0LDguMDgsOC40NDgsNS44NTYsMTMuOTA0DQoJQzE4OS4yOTYsMjIyLjE0NCwxNTEuNTA0LDI0Ny42MTYsOTkuODA4LDIzOS4zMTJ6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojM0U0MzQ3OyIgZD0iTTQwMC4xOTIsMjYxLjY4Yy02LjI1Ni0zLjY4LTI0Ljc2OCwxNi4xNi01My44NCwxNy4yNDhjLTMwLjA5NiwxLjEyLTQ3LjU4NC0yMC45MjgtNTMuODQtMTcuMjQ4DQoJYy03Ljc5MiwyLjY3MiwyLjgzMiw1My41NTIsNTMuODQsNTMuNzQ0QzM5Ny4zNDQsMzE1LjIzMiw0MDcuOTg0LDI2NC4zNTIsNDAwLjE5MiwyNjEuNjh6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRTlCMDJDOyIgZD0iTTMxMC42NzIsMTkyLjY1NmMtMi4yMjQtNS40NTYsMC40LTExLjY4LDUuODU2LTEzLjkwNGM1LjQ0LTIuMjI0LDExLjY0OCwwLjM4NCwxMy44ODgsNS44MDgNCgljMC44LDEuOTIsMTkuMTIsNDMuMjE2LDc4LjM4NCwzMy42OTZjNS44NzItMC45NiwxMS4yOTYsMy4wMjQsMTIuMjI0LDguODMyYzAuOTI4LDUuODI0LTMuMDI0LDExLjI5Ni04LjgzMiwxMi4yMjQNCglDMzYwLjg2NCwyNDcuNTY4LDMyMi44LDIyMi40LDMxMC42NzIsMTkyLjY1NnoiLz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K"
                />
              </>
            )}
          </CircularProgressbarWithChildren>
          { sport && 
            <SportCalories
              countBurnedCals={countBurnedCals}
              setCountBurnedCals={setCountBurnedCals}
            />
          }  
        </>
      ) : (
        "Calculating..."
      )}
    </div>
  );
};

export default TotalCalories;
