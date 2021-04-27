import React, { createContext, useEffect, useState } from 'react';
import { getUserInfo } from '../services/UserService';
import { getAccessToken } from '../store/AccessTokenStore';

export const UserContext = createContext();

export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null)

    const getUser = () => { 
        return getUserInfo() 
          .then(response => setUser(response))
      } 
    
      useEffect(() => { 
        if (getAccessToken()) {
          getUser()
        }
      }, [])

    const value = {
      getUser,
      setUser,
      user
    }
    
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}