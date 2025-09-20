import React from 'react';

export default function Task({ task, onTaskUpdate, onTaskDelete }) {
  return (
    <div className="task-card">
      <h4>{task.title}</h4>
      <p>Status: {task.status}</p>
      <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
      <button onClick={() => onTaskUpdate(task)}>Edit</button>
      <button onClick={() => onTaskDelete(task._id)}>Delete</button>
    </div>
  );
}
