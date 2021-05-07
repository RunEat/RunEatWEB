const { useContext } = require("react");
const { DistanceContext } = require("../contexts/DistanceContext");

export const useDistance = () => useContext(DistanceContext); // Custom hook
