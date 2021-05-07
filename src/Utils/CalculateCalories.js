export const maximumCalories = (user) => {
  console.log("user", user);

  const { weight, height, age } = user;
  let activityLevel;

  switch (user.activity[0]) {
    case "Low/Sedentary":
      activityLevel = 1.15;
      break;
    case "Moderate":
      activityLevel = 1.275;
      break;
    case "Active":
      activityLevel = 1.475;
      break;
    case "Very active":
      activityLevel = 1.675;
      break;
    case "Default":
      throw new Error("Activity level is required");
      break;
  }

  //console.log("activityLevel after switch", activityLevel);

  const BMR = 10 * weight + 6.25 * height - 5 * age + 5; // Basal Metabolic Rate (Calories to survive)
  const TDEE = BMR * activityLevel; // Total Daily Energy Expenditure (Target Calories)

  return TDEE.toFixed(0);

  //   switch(mealPlan) {
  //     case 'Balanced diet': return TDEE break; // Balanced diet --> No calorie deficit
  //     case 'Weight loss': return (TDEE * 0.8) break; // Weight loss diet --> 20% calorie deficit
  //     case 'Weight gain': return (TDEE * 1.1) break; // Weight gain diet --> 10% calorie surplus
  //     case 'Default': throw new Error("Meal plan is required") break;
  //     }
};

export const maximumCarbs = (TDEE) => {
  // Balanced diet --> 45% carbs
  const maximumCarbs = (TDEE * 0.45) / 4;
  return maximumCarbs.toFixed(0);

  // switch(mealPlan) {
  //     case 'Balanced diet': return (TDEE * 0.45) / 4 break; // Balanced diet --> 45% carbs
  //     case 'Weight loss': return (TDEE * 0.4) / 4 break; // Weight loss diet --> 40% carbs
  //     case 'Weight gain': return (TDEE * 0.55) / 4 break; // Weight gain diet --> 55% carbs
  //     case 'Default': throw new Error("Meal plan is required") break;
  // }
};

export const maximumProteins = (TDEE) => {
  // Balanced diet --> 30% proteins
  const maximumProteins = (TDEE * 0.3) / 4;
  return maximumProteins.toFixed(0);

  // switch(mealPlan) {
  //     case 'Balanced diet': return (TDEE * 0.3) / 4 break; // Balanced diet --> 30% protein
  //     case 'Weight loss': return (TDEE * 0.4) / 4 break; // Weight loss diet --> 40% protein
  //     case 'Weight gain': return (TDEE * 0.25) / 4 break; // Weight gain diet --> 25% protein
  //     case 'Default': throw new Error("Meal plan is required") break;
  // }
};

export const maximumFats = (TDEE) => {
  // Balanced diet --> 25% fat
  const maximumFats = (TDEE * 0.25) / 9;
  return maximumFats.toFixed(0);

  // switch(mealPlan) {
  //     case 'Balanced diet': return (TDEE * 0.25) / 9 break; // Balanced diet --> 25% fat
  //     case 'Weight loss': return (TDEE * 0.2) / 9 break; // Weight loss diet --> 20% fat
  //     case 'Weight gain': return (TDEE * 0.25) / 9 break; // Weight gain diet --> 25% fat
  //     case 'Default': throw new Error("Meal plan is required") break;
  // }
};

export const caloriesBurned = (user, distance) => {
  const avgkCalBurned = 1 * user.weight // 1kcal * kg --> e.g.: 70kg --> 1 * 70 every km
  return Number((avgkCalBurned * distance).toFixed(0));
}