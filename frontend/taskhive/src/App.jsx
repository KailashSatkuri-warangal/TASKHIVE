// frontend/src/App.jsx
import React, { useState, useEffect } from 'react';
import BoardGrid from './components/BoardGrid';
import CalendarView from './components/CalendarView';
import NotificationManager from './components/NotificationManager';
import FooterTranscript from './components/FooterTranscript';
import Footer from "./components/Footer";
import { api } from './api';
import './App.css';

export default function App() {
	const [boards, setBoards] = useState([]);
	const [tasks, setTasks] = useState([]);

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

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="App">
			<h1>TaskHive</h1>
			<BoardGrid boards={boards} tasks={tasks} fetchData={fetchData} />
			<h2>Calendar View</h2>
			<CalendarView tasks={tasks} fetchData={fetchData} />
			<NotificationManager tasks={tasks} />
			<FooterTranscript boards={boards} tasks={tasks} />
			<Footer />
		</div>
	);
}
