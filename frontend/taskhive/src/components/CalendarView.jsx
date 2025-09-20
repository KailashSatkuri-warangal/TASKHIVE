import React, { useState, useMemo } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import TaskModal from './TaskModal';

const localizer = momentLocalizer(moment);

export default function CalendarView({ tasks, fetchData }) {
	const [selectedTask, setSelectedTask] = useState(null);

	// Prepare calendar events with colors
	const events = tasks.map(t => {
		const deadline = new Date(t.deadline);
		let color = t.status === 'completed' ? '#28a745' : '#ffc107';
		if (deadline < new Date() && t.status !== 'completed') color = '#dc3545';
		return {
			...t,
			start: deadline,
			end: deadline,
			title: t.title,
			backgroundColor: color
		};
	});

	const eventStyleGetter = event => ({
		style: {
			backgroundColor: event.backgroundColor,
			color: '#fff',
			borderRadius: '4px',
			cursor: 'pointer',
			padding: '3px'
		}
	});

	// Compute min/max times dynamically based on tasks
	const { minTime, maxTime } = useMemo(() => {
		if (!tasks.length) {
			const start = new Date();
			start.setHours(8, 0, 0, 0);
			const end = new Date();
			end.setHours(20, 0, 0, 0);
			return { minTime: start, maxTime: end };
		}

		// Extract unique task times (hours + minutes)
		const times = tasks
			.map(t => new Date(t.deadline))
			.filter(d => !isNaN(d.getTime()));

		let min = new Date(Math.min(...times));
		min.setMinutes(0, 0, 0);
		min.setHours(min.getHours() - 1); // 1 hour padding

		let max = new Date(Math.max(...times));
		max.setMinutes(59, 59, 999);
		max.setHours(max.getHours() + 1); // 1 hour padding

		return { minTime: min, maxTime: max };
	}, [tasks]);

	return (
		<div style={{ height: '600px', marginTop: '20px' }}>
			<Calendar
				localizer={localizer}
				events={events}
				defaultView={Views.WEEK}
				views={[Views.WEEK, Views.DAY]}
				step={30}
				timeslots={1}
				min={minTime}
				max={maxTime}
				eventPropGetter={eventStyleGetter}
				onSelectEvent={event => setSelectedTask(event)}
				style={{ height: '100%', width: '100%' }}
			/>

			{/* Task modal popup */}
			{selectedTask && (
				<TaskModal
					task={selectedTask}
					boardId={selectedTask.boardId}
					onClose={() => setSelectedTask(null)}
					fetchData={fetchData}
				/>
			)}
		</div>
	);
}
