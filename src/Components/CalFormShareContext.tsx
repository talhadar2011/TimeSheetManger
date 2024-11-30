import React, { createContext, useState } from "react";

// Create the Context
export const StatusContext = createContext();

// Create the Provider Component
export const StatusProvider = ({ children }) => {
  const [startDatestate, setstartDatestate] = useState<string>(""); 
  const [endDatestate, setendDatestate] = useState<string>(""); 

  return (
    <StatusContext.Provider value={{ startDatestate, setstartDatestate,endDatestate,setendDatestate }}>
      {children}
    </StatusContext.Provider>
  );
};
