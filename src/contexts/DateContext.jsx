import React, { createContext, useState, useEffect } from 'react';

export const DateContext = createContext();

export const DateContextProvider = ({children}) => {
    const [date, setDate] = useState(new Date())

  useEffect(() => {
    date.setHours(date.getHours() + 4)
    let newDate = date.toISOString()
    setDate(new Date(newDate)) 
    //console.log(date)
  }, [])

  const value = {
      setDate,
      date
  }
    
  return <DateContext.Provider value={value}>{children}</DateContext.Provider>
}