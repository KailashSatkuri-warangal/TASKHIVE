import React, { useState, useMemo } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import TaskModal from './TaskModal';

const localizer = momentLocalizer(moment);

export default function CalendarView({ tasks, fetchData }) {
	const [selectedTask, setSelectedTask] = useState(null);
	const [view, setView] = useState(Views.WEEK);
	const [date, setDate] = useState(new Date());

	// Filter upcoming tasks (today or future)
	const upcomingTasks = tasks.filter(
		t => new Date(t.deadline) >= new Date().setHours(0,0,0,0)
	);

	// Map tasks to calendar events
	const events = upcomingTasks.map(t => {
		const deadline = new Date(t.deadline);
		let color = t.status === 'completed' ? '#28a745' : '#ffc107';
		if (deadline < new Date() && t.status !== 'completed') color = '#dc3545';

		return {
			...t,
			start: deadline,
			end: new Date(deadline.getTime() + 30 * 60 * 1000), // 30 min slot
			title: t.title,
			backgroundColor: color,
			editable: deadline >= new Date().setHours(0,0,0,0) && t.status !== 'completed'
		};
	});

	// Only show times where tasks exist
	const { minTime, maxTime } = useMemo(() => {
		if (!upcomingTasks.length) {
			const start = new Date();
			start.setHours(8,0,0,0);
			const end = new Date();
			end.setHours(20,0,0,0);
			return { minTime: start, maxTime: end };
		}
		const times = upcomingTasks.map(t => new Date(t.deadline));
		const min = new Date(Math.min(...times));
		const max = new Date(Math.max(...times));
		return { minTime: min, maxTime: max };
	}, [upcomingTasks]);

	// Event style based on status
	const eventStyleGetter = event => ({
		style: {
			backgroundColor: event.backgroundColor,
			color: '#fff',
			borderRadius: '4px',
			cursor: event.editable ? 'pointer' : 'not-allowed',
			padding: '3px'
		}
	});

	// Custom Toolbar
	const CustomToolbar = () => {
		const goToToday = () => setDate(new Date());
		const goToBack = () => {
			const newDate = moment(date).subtract(1, view === Views.MONTH ? 'month' : 'week').toDate();
			setDate(newDate);
		};
		const goToNext = () => {
			const newDate = moment(date).add(1, view === Views.MONTH ? 'month' : 'week').toDate();
			setDate(newDate);
		};

		return (
			<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
				<div>
					<button onClick={goToBack}>⬅ Prev</button>
					<button onClick={goToToday} style={{ margin: '0 5px' }}>Today</button>
					<button onClick={goToNext}>Next ➡</button>
				</div>
				<div>
					<button onClick={() => setView(Views.DAY)}>Day</button>
					<button onClick={() => setView(Views.WEEK)} style={{ margin: '0 5px' }}>Week</button>
					<button onClick={() => setView(Views.MONTH)}>Month</button>
					<button onClick={fetchData} style={{ marginLeft: 10 }}>🔄 Refresh</button>
				</div>
			</div>
		);
	};

	return (
		<div style={{ marginTop: '20px' }}>
			{/* Advanced Buttons Toolbar */}
			<CustomToolbar />

			<Calendar
				localizer={localizer}
				events={events}
				view={view}
				date={date}
				onView={setView}
				onNavigate={setDate}
				style={{ height: 500 }}
				eventPropGetter={eventStyleGetter}
				onSelectEvent={event => setSelectedTask(event)}
				min={minTime}
				max={maxTime}
			/>

			{/* Task Popup */}
			{selectedTask && (
				<TaskModal
					task={selectedTask}
					onClose={() => setSelectedTask(null)}
					fetchData={fetchData}
				/>
			)}
		</div>
	);
}
