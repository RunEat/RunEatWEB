let storedDate = window.localStorage.getItem('storedDate') || null

export const getStoredDate = () => storedDate

export const setStoredDate = date => {
  window.localStorage.setItem('storedDate', date.toISOString())
  storedDate = date.toISOString()
}