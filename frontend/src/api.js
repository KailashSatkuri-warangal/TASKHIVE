import axios from 'axios';
export const api = axios.create({
	baseURL: 'https://taskhive-9zls.onrender.com/api',
	headers: { 'Content-Type': 'application/json' }
});
