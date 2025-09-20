// frontend/src/components/TaskCard.jsx
import React from 'react';
import { api } from '../api';

export default function TaskCard({ task, fetchData }) {

	const toggleStatus = async () => {
		const newStatus = task.status === 'pending' ? 'completed' : 'pending';
		await api.put(`/tasks/${task._id}`, { ...task, status: newStatus });
		await fetchData();
	};

	const handleDelete = async () => {
		if (!window.confirm('Delete this task?')) return;
		await api.delete(`/tasks/${task._id}`);
		await fetchData();
	};

	return (
		<div className="task-card" style={{ borderLeft: task.status === 'completed' ? '4px solid #28a745' : '4px solid #ffc107' }}>
			<h4>{task.title}</h4>
			<p>Status: {task.status}</p>
			<p>Deadline: {new Date(task.deadline).toLocaleString()}</p>
			<div className="task-actions">
				<button onClick={toggleStatus}>
					{task.status === 'pending' ? 'Mark Completed' : 'Mark Pending'}
				</button>
				<button onClick={handleDelete}>Delete</button>
			</div>
		</div>
	);
}
