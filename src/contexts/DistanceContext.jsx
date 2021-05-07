import React, { createContext, useState } from "react";

export const DistanceContext = createContext();

export const DistanceContextProvider = ({ children }) => {
  const [distance, setDistance] = useState();

  const value = {
    setDistance,
    distance,
  };

  return <DistanceContext.Provider value={value}>{children}</DistanceContext.Provider>;
};
