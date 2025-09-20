import React, { useState } from 'react';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal.jsx';
import { api } from '../api';

export default function BoardDetail({ board, tasks, setTasks, onClose, fetchData }) {
	const [openTaskModal, setOpenTaskModal] = useState(false);
	const [selectedTask, setSelectedTask] = useState(null);
	const [search, setSearch] = useState('');

	const filteredTasks = tasks.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));

	const handleAddTask = () => {
		setSelectedTask(null);
		setOpenTaskModal(true);
	};

	const handleEditTask = task => {
		setSelectedTask(task);
		setOpenTaskModal(true);
	};

	return (
		<div className="board-detail">
			<div className="board-detail-header">
				<h2>{board.title}</h2>
				<button onClick={handleAddTask}>Add Task</button>
				<button onClick={onClose}>Close</button>
			</div>
			<input type="text" placeholder="Search tasks..." value={search} onChange={e => setSearch(e.target.value)} />
			<div className="task-grid">
				{filteredTasks.map(task => (
					<TaskCard key={task._id} task={task} onEdit={() => handleEditTask(task)} fetchData={fetchData} />
				))}
			</div>
			{openTaskModal && (
				<TaskModal
					task={selectedTask}
					boardId={board._id}
					onClose={() => setOpenTaskModal(false)}
					fetchData={fetchData}
				/>
			)}
		</div>
	);
}
