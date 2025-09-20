import React from 'react';

export default function BoardCard({ board, onClick, isAdd }) {
	return (
		<div className={`board-card ${isAdd ? 'add-board' : ''}`} onClick={onClick}>
			{isAdd ? '+' : board.title}
		</div>
	);
}
