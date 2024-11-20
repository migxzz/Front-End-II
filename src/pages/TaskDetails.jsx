import React from 'react';
import { useParams } from 'react-router-dom';

function TaskDetails() {
  const { taskId } = useParams();

  return (
    <div>
      <h2>Detalhes da Tarefa</h2>
      <p>Exibindo detalhes da tarefa com ID: {taskId}</p>
      {/* Adicione aqui informações mockadas da tarefa */}
    </div>
  );
}

export default TaskDetails;
