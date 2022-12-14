import React from 'react';
import { useAuth } from '@hooks/useAuth';

const AuthContext = React.createContext({});

type Props = {
  children: JSX.Element
}

function AuthContextProvider({ children }: Props) {
  const authInfo = useAuth();

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };

/* {
  currentUser,
  setCurrentUser,
  validateUser,
  addNewUser,
  editCurrentUserInfo,
  syncAuth
} */
