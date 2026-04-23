import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
 
    const [data, setData] = useState({
        householdSize: 1,
        members: [],
        hasIncome: false
    });

  return (
    <AppContext.Provider value={{ data, setData }}>
      {children}
    </AppContext.Provider>
  );
};