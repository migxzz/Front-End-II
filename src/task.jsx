// src/Task.jsx
import React, { useState } from 'react';

function Task({ task, removeTask, addStep, toggleStepCompleted, removeStep }) {
  const [stepDescription, setStepDescription] = useState('');

  const handleAddStep = () => {
    if (stepDescription.trim()) {
      addStep(task.id, stepDescription);
      setStepDescription('');
    }
  };

  return (
    <div
      style={{
        marginBottom: '20px',
        border: '1px solid #ddd',
        padding: '10px',
        backgroundColor: task.completed ? '#d3ffd3' : 'white',
      }}
    >
      <h2>
        {task.title}{' '}
        <button onClick={() => removeTask(task.id)}>Remover Tarefa</button>
      </h2>
      <div>
        <input
          type="text"
          value={stepDescription}
          onChange={(e) => setStepDescription(e.target.value)}
          placeholder="Novo passo"
        />
        <button onClick={handleAddStep}>Adicionar Passo</button>
      </div>
      <ul>
        {task.steps.map((step) => (
          <li
            key={step.id}
            style={{
              textDecoration: step.completed ? 'line-through' : 'none',
              color: step.completed ? 'green' : 'black',
            }}
          >
            {step.description}
            <button onClick={() => toggleStepCompleted(task.id, step.id)}>
              {step.completed ? 'Desmarcar' : 'Completar'}
            </button>
            <button onClick={() => removeStep(task.id, step.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Task;
