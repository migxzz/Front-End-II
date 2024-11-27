import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();

  if (!auth) {
    // Se o usuário não estiver autenticado, redireciona para a página de login
    return <Navigate to="/login" />;
  }

  return children; // Caso contrário, renderiza a página protegida
};

export default ProtectedRoute;
