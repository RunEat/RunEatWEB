import { create } from "./BaseService";

const http = create()

export const addMeal = (body) => {
	return http.post(`/diary/meal`, body)
}

export const getMeal = (query) => {
	return http.get(`/diary/meal?${query}`)
}