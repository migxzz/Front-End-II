import React, { useContext, useState } from 'react';
import { MockDataContext } from '../MockDataProvider';

function TodoPage() {
  const { data, updateTask } = useContext(MockDataContext);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim()) {
      const newTaskObj = {
        id: data.tasks.length + 1,
        title: newTask,
        completed: false,
      };
      updateTask(null, { tasks: [...data.tasks, newTaskObj] }); // Adiciona uma nova tarefa
      setNewTask('');
    }
  };

  return (
    <div>
      <h1>TodoList</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Adicione uma tarefa"
      />
      <button onClick={handleAddTask}>Adicionar</button>

      <ul>
        {data.tasks.map((task) => (
          <li key={task.id}>
            <span
              onClick={() =>
                updateTask(task.id, { completed: !task.completed })
              }
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
            >
              {task.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoPage;
