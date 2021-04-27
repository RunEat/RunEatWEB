import { create } from "./BaseService";

const http = create();


export const getDiary = (query) => {
    http.get(`/diary?date=${query}`)
}