import React from 'react';
import { useAuth } from '../AuthProvider';

function Dashboard() {
  const { logout } = useAuth();

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={logout}>Sair</button>
    </div>
  );
}

export default Dashboard;
