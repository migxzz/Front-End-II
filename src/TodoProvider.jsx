// Importa as dependências necessárias
import React, { createContext, useState, useRef, useEffect } from 'react';

// Cria o contexto para compartilhar o estado das tarefas pelo app
export const TodoContext = createContext();

// Componente que irá envolver outros componentes e fornecer o contexto
export function TodoProvider({ children }) {
  // Estado para armazenar a lista de tarefas
  const [tasks, setTasks] = useState([]);

  // useRef para controlar o próximo ID único para as tarefas
  const nextTaskId = useRef(1);

  // Carrega as tarefas do localStorage quando o componente é montado
  useEffect(() => {
    // Lê as tarefas salvas em localStorage e as converte para um array
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));

    // Se houver tarefas salvas, atualiza o estado de 'tasks' e o próximo ID
    if (storedTasks) {
      setTasks(storedTasks);

      // Define 'nextTaskId' para o maior ID atual + 1, para evitar duplicação de IDs
      const maxId = Math.max(...storedTasks.map((task) => task.id), 0);
      nextTaskId.current = maxId + 1;
    }
  }, []);

  // Salva as tarefas no localStorage sempre que a lista 'tasks' mudar
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Função para adicionar uma nova tarefa
  const addTask = (title) => {
    // Cria uma nova tarefa com um título e uma lista de passos vazia
    const newTask = {
      id: nextTaskId.current++,
      title,
      steps: [],
      completed: false,
    };

    // Adiciona a nova tarefa à lista de tarefas existente
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // Função para remover uma tarefa pelo ID
  const removeTask = (taskId) => {
    // Filtra as tarefas removendo a tarefa correspondente ao 'taskId' passado
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  // Função para adicionar um passo a uma tarefa específica
  const addStep = (taskId, stepDescription) => {
    // Atualiza a tarefa específica, adicionando um novo passo à lista de passos
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              steps: [
                ...task.steps,
                {
                  id: Date.now(),
                  description: stepDescription,
                  completed: false,
                },
              ],
            }
          : task
      )
    );
  };

  // Função para marcar/desmarcar um passo como concluído
  const toggleStepCompleted = (taskId, stepId) => {
    // Atualiza a tarefa específica, alterando o status do passo
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              steps: task.steps.map((step) =>
                step.id === stepId
                  ? { ...step, completed: !step.completed }
                  : step
              ),
              // Define 'completed' como true se todos os passos estiverem concluídos
              completed: task.steps.every(
                (step) => step.completed || step.id === stepId
              ),
            }
          : task
      )
    );
  };

  // Função para remover um passo de uma tarefa específica
  const removeStep = (taskId, stepId) => {
    // Atualiza a tarefa específica, removendo o passo correspondente
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, steps: task.steps.filter((step) => step.id !== stepId) }
          : task
      )
    );
  };

  // Retorna o provedor do contexto com o valor das funções e estado global
  return (
    <TodoContext.Provider
      value={{
        tasks,
        addTask,
        removeTask,
        addStep,
        toggleStepCompleted,
        removeStep,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
