import React, { useEffect, useState } from 'react';
import Board from './Board';
import { api } from '../api';

export default function BoardList({ tasks, setTasks }) {
	const [boards, setBoards] = useState([]);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const boardsRes = await api.get('/boards');
			setBoards(boardsRes.data);

			const tasksRes = await api.get('/tasks');
			setTasks(tasksRes.data);
		} catch (err) {
			console.error(err);
		}
	};

	const handleAddBoard = async () => {
		const title = prompt('New board title');
		if (!title) return;
		await api.post('/boards', { title });
		fetchData();
	};

	const handleAddTask = async boardId => {
		const title = prompt('Task title');
		if (!title) return;
		await api.post('/tasks', {
			title,
			boardId,
			status: 'pending',
			deadline: new Date().toISOString()
		});
		fetchData();
	};

	const handleTaskUpdate = async task => {
		const newTitle = prompt('Update task title', task.title);
		if (!newTitle) return;
		await api.put(`/tasks/${task._id}`, { ...task, title: newTitle });
		fetchData();
	};

	const handleTaskDelete = async id => {
		await api.delete(`/tasks/${id}`);
		fetchData();
	};

	return (
		<div>
			<button onClick={handleAddBoard}>Add Board</button>
			<div className="board-list">
				{boards.map(board => {
					const boardTasks = tasks.filter(t => t.boardId === board._id);
					return (
						<Board
							key={board._id}
							board={board}
							tasks={boardTasks}
							onTaskUpdate={handleTaskUpdate}
							onTaskDelete={handleTaskDelete}
							onAddTask={handleAddTask}
						/>
					);
				})}
			</div>
		</div>
	);
}
