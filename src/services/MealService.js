import { create } from "./BaseService";

const http = create()

export const addMeal = (body) => {
	return http.post(`/diary/meal`, body)
}