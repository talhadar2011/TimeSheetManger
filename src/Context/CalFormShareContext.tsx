import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the context
interface Dates {
  startDate: string;
  endDate: string;
  project:string;
  starttime:string;
  endtime:string;
  hours:number
}

interface DateContextType {
  dates: Dates;
  setDates: React.Dispatch<React.SetStateAction<Dates>>;
}

// Create the context
const DateContext = createContext<DateContextType | undefined>(undefined);

// Props for the provider
interface DateProviderProps {
  children: ReactNode;
}

// Create the provider
export const DateProvider: React.FC<DateProviderProps> = ({ children }) => {
  const [dates, setDates] = useState<Dates>({ startDate: "", endDate: "",project:"",starttime:"",endtime:"",hours:0 });

  return (
    <DateContext.Provider value={{ dates, setDates}}>
      {children}
    </DateContext.Provider>
  );
};

// Custom hook to use the DateContext
export const useDateContext = (): DateContextType => {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error("useDateContext must be used within a DateProvider");
  }
  return context;
};
