// src/components/BoardMarquee.jsx
import React from 'react';

export default function BoardMarquee({ boards, onBoardClick }) {
	return (
		<div className="board-marquee">
			{boards.map(board => (
				<div key={board._id} className="marquee-item" onClick={() => onBoardClick(board)}>
					{board.title}
				</div>
			))}
		</div>
	);
}
