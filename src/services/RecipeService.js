import axios from "axios";

const http = axios.create({
    baseURL: 'https://api.edamam.com'
});

http.interceptors.response.use((response) => response.data.hits);
  
export const getRecipe = (id, mealType) => {
    return axios.get(`https://api.edamam.com/search?mealType=${mealType}app_id=9a7c60e0&app_key=e205a49b2a08604e7af4f6faa40d7ca0&r=http://www.edamam.com/ontologies/edamam.owl%23recipe_${id}`)
}

export const getBreakfast = (query) => {
    return http.get(`/search?mealType=breakfast&q=${query}&app_id=9a7c60e0&app_key=e205a49b2a08604e7af4f6faa40d7ca0&from=0&to=10`)
}

export const getLunch = (query) => {
    return http.get(`/search?mealType=lunch&q=${query}&app_id=9a7c60e0&app_key=e205a49b2a08604e7af4f6faa40d7ca0&from=0&to=10`)
}

export const getDinner = (query) => {
    return http.get(`/search?mealType=dinner&q=${query}&app_id=9a7c60e0&app_key=e205a49b2a08604e7af4f6faa40d7ca0&from=0&to=10`)
}

export const getSnacks = (query) => {
    return http.get(`/search?mealType=snack&q=${query}&app_id=9a7c60e0&app_key=e205a49b2a08604e7af4f6faa40d7ca0&from=0&to=10`)
}
 