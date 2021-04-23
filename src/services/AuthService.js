import { create } from "./BaseService";
import { Redirect } from "react-router-dom"

const http = create({
  useAccessToken: false,
  reloadOnUnauthorized: false,
})

export const signup = (user) => {
  return http.post('/user/signup', user)
}

export const activate = (token) => {
  return http.get(`/user/activate/${token}`)
}

export const login = (body) => {
  return http.post('/user/login', body)
}

export const passwordReset = (user) => {
  return http.post('/user/password_reset', user)
}

export const updatePassword = (user) => {
  return http.put('/user/password_reset', user)
}