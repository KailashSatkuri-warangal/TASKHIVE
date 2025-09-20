// src/components/BoardModal.jsx
import React, { useState } from 'react';

export default function BoardModal({ isOpen, onClose, onSave, board }) {
	const [title, setTitle] = useState(board ? board.title : '');

	if (!isOpen) return null;

	const handleSave = () => {
		if (!title.trim()) return alert('Title required');
		onSave({ ...board, title });
		onClose();
	};

	return (
		<div className="modal-overlay">
			<div className="modal">
				<h2>{board ? 'Edit Board' : 'New Board'}</h2>
				<input value={title} onChange={e => setTitle(e.target.value)} placeholder="Board title" />
				<div className="modal-actions">
					<button onClick={handleSave}>Save</button>
					<button onClick={onClose}>Cancel</button>
				</div>
			</div>
		</div>
	);
}
