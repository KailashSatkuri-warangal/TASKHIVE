import React from 'react';
import TaskCard from './TaskCard.jsx';

export default function Board({ board, tasks, onTaskUpdate, onTaskDelete, onAddTask }) {
	return (
		<div className="board">
			<h2>{board.title}</h2>
			<button onClick={() => onAddTask(board._id)}>Add Task</button>
			{tasks.map(task => (
				<TaskCard key={task._id} task={task} onTaskUpdate={onTaskUpdate} onTaskDelete={onTaskDelete} />
			))}
		</div>
	);
}
