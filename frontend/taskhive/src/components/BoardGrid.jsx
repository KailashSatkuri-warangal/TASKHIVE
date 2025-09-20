import React, { useState } from 'react';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import { api } from '../api';

export default function BoardGrid({ boards, tasks, fetchData }) {
	const [selectedBoard, setSelectedBoard] = useState(null);

	const [showModal, setShowModal] = useState(false);

	const handleAddBoard = async () => {
		const name = prompt('Enter board name');
		if (!name) return;
		await api.post('/boards', { title: name });
		fetchData();
	};

	return (
		<div>
			<button onClick={handleAddBoard}>Add Board</button>
			<div className="boards-grid">
				{boards.map(board => (
					<div key={board._id} className="board">
						<h3>{board.title}</h3>
						<button onClick={() => { setSelectedBoard(board); setShowModal(true); }}>Add Task</button>
						<div className="tasks-list">
							{tasks.filter(t => t.boardId === board._id).map(task => (
								<TaskCard key={task._id} task={task} fetchData={fetchData} />
							))}
						</div>
					</div>
				))}
			</div>
			{showModal && selectedBoard && (
				<TaskModal
					boardId={selectedBoard._id}
					onClose={() => { setShowModal(false); setSelectedBoard(null); }}
					fetchData={fetchData}
				/>
			)}
		</div>
	);
}
