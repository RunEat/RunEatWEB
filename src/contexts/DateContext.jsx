import React, { createContext, useState } from 'react';

export const DateContext = createContext();

export const DateContextProvider = ({children}) => {
    const [date, setDate] = useState(new Date())

      // date.setHours(date.getHours() + 4)
      // let newDate = date.toISOString()
      // setDate(newDate) 

  const value = {
      setDate,
      date
  }
    
  return <DateContext.Provider value={value}>{children}</DateContext.Provider>
}