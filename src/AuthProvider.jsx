import React, { createContext, useState, useContext, useEffect } from 'react';

// Criação do contexto de autenticação
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    // Aqui você pode verificar no localStorage se o usuário está autenticado
    const user = localStorage.getItem('user');
    if (user) {
      setAuth(true); // O usuário está autenticado
    }
  }, []);

  const login = () => {
    setAuth(true);
    localStorage.setItem('user', 'loggedIn');
  };

  const logout = () => {
    setAuth(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
