export const MaxCalories = (user) => {

  console.log("user", user);

  const { weight, height, age } = user;
  let activityLevel;

  switch (user.activity[0]) {
    case "Sedentary":
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

  console.log("activityLevel after switch", activityLevel);

  const BMR = 10 * weight + 6.25 * height - 5 * age + 5; // Basal Metabolic Rate (Calories to survive)
  const TDEE = BMR * activityLevel; // Total Daily Energy Expenditure (Target Calories)

  return TDEE;
};

export const MaxMacros = () => {};
