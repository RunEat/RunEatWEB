import { create } from "./BaseService";

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

export const passwordResetEmail = (user) => {
  console.log(user)
  return http.post('/user/password_reset', user)
}

// Update Password
export const passwordReset = (token) => {
  return http.get(`/user/password_reset/${token}`)
}

export const updatePassword = (user) => {
  console.log(user)
  return http.put('/user/password_reset', user)
}