import React, {createContext, useState} from 'react';

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export interface AuthContextType {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType | boolean>(false);

export const AuthContextProvider = ({children}: AuthContextProviderProps) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  return (
    <AuthContext.Provider value={{loggedIn, setLoggedIn}}>
      {children}
    </AuthContext.Provider>
  );
};
