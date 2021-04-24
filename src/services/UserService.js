import { create } from "./BaseService";

const http = create()

export const getUserInfo = () => {
  return http.get('/user/profile')
}

export const editUser = (editedUser) => {
  return http.put('/user/edit', editedUser)
}