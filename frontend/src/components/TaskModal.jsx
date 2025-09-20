import React, { useState } from 'react';
import { api } from '../api';

export default function TaskModal({ task = null, boardId, onClose, fetchData }) {
	const [title, setTitle] = useState(task ? task.title : '');
	const [status, setStatus] = useState(task ? task.status : 'pending');
	const [deadline, setDeadline] = useState(task ? task.deadline : '');

	const handleSave = async () => {
		if (!title) return alert('Title required');
		if (task) {
			await api.put(`/tasks/${task._id}`, { ...task, title, status, deadline });
		} else {
			await api.post('/tasks', { title, status, deadline, boardId });
		}
		fetchData();
		onClose();
	};

	return (
		<div className="modal-backdrop">
			<div className="modal">
				<h3>{task ? 'Edit Task' : 'Add Task'}</h3>
				<input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
				<input type="datetime-local" value={deadline} onChange={e => setDeadline(e.target.value)} />
				<select value={status} onChange={e => setStatus(e.target.value)}>
					<option value="pending">Pending</option>
					<option value="completed">Completed</option>
				</select>
				<div>
					<button onClick={handleSave}>{task ? 'Update' : 'Add'}</button>
					<button onClick={onClose}>Cancel</button>
				</div>
			</div>
		</div>
	);
}
