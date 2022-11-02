import React from 'react';
import { useInitialState } from '@hooks/useInitialState';

const AppContext = React.createContext({});

type Props = {
  children: JSX.Element
}

export function AppContextProvider({ children }: Props) {
  const initialState = useInitialState();

  return (
    <AppContext.Provider value={initialState}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
