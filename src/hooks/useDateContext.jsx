const { useContext } = require("react");
const { DateContext } = require("../contexts/DateContext");

export const useDate = () => useContext(DateContext); // Custom hook