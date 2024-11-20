// src/TaskInput.jsx
import React, { useState, useContext } from 'react';
import { TodoContext } from './TodoProvider';

function TaskInput() {
  const [title, setTitle] = useState('');
  const { addTask } = useContext(TodoContext);

  const handleAddTask = () => {
    if (title.trim()) {
      addTask(title);
      setTitle('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nova tarefa"
      />
      <button onClick={handleAddTask}>Adicionar Tarefa</button>
    </div>
  );
}

export default TaskInput;
