import React, { useEffect, useState } from "react";
import { maximumCalories, maximumCarbs, maximumProteins, maximumFats } from "../../Utils/CalculateCalories";
import { Bar } from "react-chartjs-2";
import { useUser } from "../../hooks/useUserContext";

function MacrosChart({ meal }) {
  const [fats, setFats] = useState();
  const [proteins, setProteins] = useState();
  const [carbs, setCarbs] = useState();

  const [maxCarbs, setMaxCarbs] = useState();
  const [maxProteins, setMaxProteins] = useState();
  const [maxFats, setMaxFats] = useState();
  
  const { user } = useUser();
  
  useEffect(() => {
      if (user) {
        const TDEE = maximumCalories(user);
        setMaxCarbs(maximumCarbs(TDEE));
        setMaxProteins(maximumProteins(TDEE));
        setMaxFats(maximumFats(TDEE));
    }
  });

  useEffect(() => {
      if (meal) {
        console.log("meal", meal);
      let fatsBreakfast = meal.mealType.breakfast
        ? meal.mealType.breakfast.macros.fats
        : 0;
      let fatsLunch = meal.mealType.lunch
        ? meal.mealType.lunch.macros.fats
        : 0;
      let fatsDinner = meal.mealType.dinner
        ? meal.mealType.dinner.macros.fats
        : 0;
      let fatsSnacks = meal.mealType.snacks
        ? meal.mealType.snacks.macros.fats
        : 0;

      setFats(fatsBreakfast + fatsDinner + fatsLunch + fatsSnacks);

      let proteinsBreakfast = meal.mealType.breakfast
        ? meal.mealType.breakfast.macros.proteins
        : 0;
      let proteinsLunch = meal.mealType.lunch
        ? meal.mealType.lunch.macros.proteins
        : 0;
      let proteinsDinner = meal.mealType.dinner
        ? meal.mealType.dinner.macros.proteins
        : 0;
      let proteinsSnacks = meal.mealType.snacks
        ? meal.mealType.snacks.macros.proteins
        : 0;

      setProteins(proteinsBreakfast + proteinsDinner + proteinsLunch + proteinsSnacks);

      let carbsBreakfast = meal.mealType.breakfast
        ? meal.mealType.breakfast.macros.carbs
        : 0;
      let carbsLunch = meal.mealType.lunch
        ? meal.mealType.lunch.macros.carbs
        : 0;
      let carbsDinner = meal.mealType.dinner
        ? meal.mealType.dinner.macros.carbs
        : 0;
      let carbsSnacks = meal.mealType.snacks
        ? meal.mealType.snacks.macros.carbs
        : 0;

      setCarbs(carbsBreakfast + carbsDinner + carbsLunch + carbsSnacks);
    }
  }, [meal]);

  return (
    <div className="MacrosChart">
      <table>
        <tbody>
          <tr className="text-align-center">
            <Bar
              pointStyle="star"
              data={{
                responsive: true,
                offset: true,
                datasets: [
                  {
                    label: "MaxFats",
                    pointStyle: "rectRounded",
                    backgroundColor: "#6ED3FF",
                    barThickness: 40,
                    categoryPercentage: 1,
                  },
                  {
                    label: "FatsConsumed",
                    backgroundColor: "#1497FF",
                    barThickness: 40,
                    categoryPercentage: 1,
                    pointStyle: "triangle",
                  },
                ],
              }}
              height={220}
              options={{
                offsetGridLines: true,
                drawTicks: true,
                layout: {
                  padding: {
                    top: 30,
                    right: 40,
                    bottom: 40,
                  },
                },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  xAxes: [
                    {
                      stacked: true,
                      ticks: {
                        padding: 5,
                      },
                      gridLines: {
                        display: false,
                      },
                    },
                  ],
                  yAxes: [
                    {
                      stacked: false,
                      gridLines: {
                        drawBorder: false,
                      },
                      ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 6,
                        padding: 20,
                        callback(n) {
                          if (n < 1e3) return n;
                          if (n >= 1e3) return +(n / 1e3).toFixed(1) + "K";
                        },
                      },
                    },
                  ],
                },
              }}
            />
            <td>Fats</td>
            <td>{fats}/ 50 g</td>
          </tr>
          <tr>
            <td>Proteins</td>
            <td>{proteins}/50 g</td>
          </tr>
          <tr>
            <td>Carbs</td>
            <td>{carbs}/50 g</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default MacrosChart;
