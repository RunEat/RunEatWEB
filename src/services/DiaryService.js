import { create } from "./BaseService";

const http = create();

export const getDiary = (date) => {
    return http.get(`/diary?date=${date}`)
}