import React from 'react';
import { useInitialState } from "@hooks/useInitialState";

const AppContext = React.createContext({});

export function AppContextProvider({ children }) {
  const initialState = useInitialState();

  return (
    <AppContext.Provider value={initialState}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
