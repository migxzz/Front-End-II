import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import tasksMock from './data/tasks.json';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Carregar tarefas mockadas
    setTasks(tasksMock);
  }, []);

  return (
    <div>
      <h2>Lista de Tarefas</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <Link to={`/tasks/${task.id}`}>{task.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
