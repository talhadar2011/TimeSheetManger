import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the type for the shared function
type SharedFunction = ((project:string,startdate:string,enddate:string,
  starttime:string,endtime:string,WorkingHours:number) => void) | null;

// Define the context value type
interface FunctionContextType {
  definedFunction: SharedFunction;
  setDefinedFunction: React.Dispatch<React.SetStateAction<SharedFunction>>;
}

// Create the Context with a default value
const FunctionContext = createContext<FunctionContextType | undefined>(undefined);

// Provider Component Props
interface FunctionProviderProps {
  children: ReactNode;
}

// Provider Component
export const FunctionProvider: React.FC<FunctionProviderProps> = ({ children }) => {
  const [definedFunction, setDefinedFunction] = useState<SharedFunction>(null);

  return (
    <FunctionContext.Provider value={{ definedFunction, setDefinedFunction }}>
      {children}
    </FunctionContext.Provider>
  );
};

// Custom Hook for Convenience
export const useFunctionContext = (): FunctionContextType => {
  const context = useContext(FunctionContext);
  if (!context) {
    throw new Error("useFunctionContext must be used within a FunctionProvider");
  }
  return context;
};
