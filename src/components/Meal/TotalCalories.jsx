import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { MaxCalories, MaxMacros } from "../../Utils/CalculateCalories";
import { useUser } from "../../hooks/useUserContext";

function TotalCalories({ meal }) {
  //console.log('Meal totalCalories', meal)
    const [maxCalories, setMaxCalories] = useState()
    const [calories, setCalories] = useState()

    const { user } = useUser();
    
    useEffect(() => {
        if (user) {
            setMaxCalories(MaxCalories(user))
        }
    }, [user])

    console.log('meal', meal)

    useEffect(() => {
        if (meal) {
            let breakfast = meal.mealType.breakfast
              ? meal.mealType.breakfast.calories
              : 0;
            let lunch = meal.mealType.lunch
              ? meal.mealType.lunch.calories
              : 0;
            let dinner = meal.mealType.dinner
              ? meal.mealType.dinner.calories
              : 0;
            let snacks = meal.mealType.snacks
              ? meal.mealType.snacks.calories
              : 0;
      
            setCalories(breakfast + lunch + dinner + snacks);  
        }
    }, [meal])

  return (
    <div className="TotalCalories">
      {user ? (
        <>
          <Doughnut
            data={{
              labels: ["Maximun", "Calories"],
              datasets: [
                {
                  labels: "Calories",
                  data: [maxCalories, calories],
                  backgroundColor: ["grey", "green"],
                },
              ],
            }}
            height={200}
            weight={200}
            options={{ maintainAspectRatio: false }}
          />
        </>
      ) : (
        "Calculate.."
      )}
    </div>
  );
}

export default TotalCalories;
