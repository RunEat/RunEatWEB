import { create } from "./BaseService";

const http = create();

export const createSport = (body) => {
    return http.post('/diary/sport', body)
}