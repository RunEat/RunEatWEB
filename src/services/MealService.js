import { create } from "./BaseService";

const http = create()

export const addMeal = (body) => {
	return http.post(`/diary/meal`, body)
}

export const getMeal = (query) => {
	return http.get(`/diary/meal?date=${query}`)
}

export const editMeal = (dateQuery, mealTypeQuery) => {
	return http.put(`/diary/meal/edit?date=${dateQuery}&mealType=${mealTypeQuery}`)
}