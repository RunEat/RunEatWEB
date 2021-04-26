import axios from "axios";

const http = axios.create({
    baseURL: 'https://api.edamam.com'
});


http.interceptors.response.use((response) => response.data);
  
// export const getRecipes = (query, mealType) => {
//     return http.get(`/search?mealType=${mealType}q=${query}&app_id=9a7c60e0&app_key=e205a49b2a08604e7af4f6faa40d7ca0`)
// }

export const getBreakfast = () => {
    return http.get(`/search?mealType=breakfast&q=&app_id=9a7c60e0&app_key=e205a49b2a08604e7af4f6faa40d7ca0&from=0&to=10`)
}

export const getLunch = () => {
    return http.get(`/search?mealType=lunch&q=&app_id=9a7c60e0&app_key=e205a49b2a08604e7af4f6faa40d7ca0`)
}

export const getDinner = () => {
    return http.get(`/search?mealType=dinner&q=&app_id=9a7c60e0&app_key=e205a49b2a08604e7af4f6faa40d7ca0`)
}

export const getSnacks = () => {
    return http.get(`/search?mealType=snack&q=&app_id=9a7c60e0&app_key=e205a49b2a08604e7af4f6faa40d7ca0`)
}

 