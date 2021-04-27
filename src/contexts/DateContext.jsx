import React, { createContext, useState } from 'react';

export const DateContext = createContext();

export const DateContextProvider = ({children}) => {
    const [date, setDate] = useState(new Date())

    const value = {
      setDate,
      date
    }
    
    return <DateContext.Provider value={value}>{children}</DateContext.Provider>
}