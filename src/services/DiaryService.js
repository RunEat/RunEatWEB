import { create } from "./BaseService";

const http = create();

export const getDiary = (query) => {
    return http.get(`/diary?date=${query}`)
}