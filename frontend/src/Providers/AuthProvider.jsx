import { createContext, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = props => {
  const { children } = props;

  // ユーザー情報
  const [ user, setUser ] = useState({
    id: '',
    email: '',
    accessToken: '',
  });    

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};