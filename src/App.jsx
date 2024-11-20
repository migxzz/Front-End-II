import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TodoProvider } from './TodoProvider';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import Login from './pages/Login';
import Register from './pages/Register';
import TaskDetails from './pages/TaskDetails';
import './App.css';

function App() {
  return (
    <TodoProvider>
      <Router>
        <div>
          <h1>TodoList</h1>
          <Routes>
            {/* Página inicial */}
            <Route path="/" element={<Navigate to="/tasks" />} />
            
            {/* Rotas para tarefas */}
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/tasks/:taskId" element={<TaskDetails />} />
            
            {/* Rotas de autenticação */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Página não encontrada */}
            <Route path="*" element={<h2>404 - Página não encontrada</h2>} />
          </Routes>
        </div>
      </Router>
    </TodoProvider>
  );
}

export default App;
