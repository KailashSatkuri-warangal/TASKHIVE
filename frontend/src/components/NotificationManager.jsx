// frontend/src/components/NotificationManager.jsx
import React, { useEffect } from 'react';

export default function NotificationManager({ tasks }) {
	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date();
			tasks.forEach(task => {
				const deadline = new Date(task.deadline);
				const diff = (deadline - now) / (1000 * 60); // minutes
				if ((diff <= 60 && diff > 0) || (diff <= 30 && diff > 0)) {
					new Notification(`Task Reminder: ${task.title}`, { body: `Due at ${deadline.toLocaleTimeString()}` });
				}
			});
		}, 60000);

		return () => clearInterval(interval);
	}, [tasks]);

	return null;
}
