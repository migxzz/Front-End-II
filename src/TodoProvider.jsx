import React, { createContext, useState, useRef, useEffect } from 'react';

// Cria o contexto para o TodoList
export const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const nextTaskId = useRef(1);

  // Carrega as tarefas salvas do localStorage quando o componente é montado
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);

      // Define o próximo ID baseado no maior ID salvo
      const maxId = Math.max(...storedTasks.map((task) => task.id), 0);
      nextTaskId.current = maxId + 1;
    }
  }, []);

  // Salva as tarefas no localStorage sempre que elas mudarem
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Adiciona uma nova tarefa
  const addTask = (title) => {
    const newTask = { id: nextTaskId.current++, title, completed: false };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // Remove uma tarefa
  const removeTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  // Alterna o status de conclusão de uma tarefa
  const toggleTaskCompleted = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <TodoContext.Provider value={{ tasks, addTask, removeTask, toggleTaskCompleted }}>
      {children}
    </TodoContext.Provider>
  );
}
