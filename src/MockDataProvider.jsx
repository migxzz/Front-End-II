import React, { createContext, useState } from 'react';

// Dados mockados
const mockData = {
  users: [
    { id: 1, name: 'João', email: 'joao@gmail.com' },
    { id: 2, name: 'Maria', email: 'maria@gmail.com' },
  ],
  tasks: [
    { id: 1, title: 'Estudar React', completed: false },
    { id: 2, title: 'Criar projeto no Vite', completed: true },
  ],
};

// Cria o contexto
export const MockDataContext = createContext();

export function MockDataProvider({ children }) {
  const [data, setData] = useState(mockData);

  // Função para atualizar tarefas (exemplo de mutação nos dados mockados)
  const updateTask = (taskId, updates) => {
    setData((prevData) => ({
      ...prevData,
      tasks: prevData.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updates } : task
      ),
    }));
  };

  return (
    <MockDataContext.Provider value={{ data, updateTask }}>
      {children}
    </MockDataContext.Provider>
  );
}
