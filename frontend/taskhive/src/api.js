// // src/api.js
// import axios from 'axios';

// export const api = axios.create({
// 	baseURL: 'http://localhost:5000/api',
// 	headers: { 'Content-Type': 'application/json' }
// });
import axios from 'axios';

export const api = axios.create({
	baseURL: 'https://taskhive-backend.onrender.com/api',
	headers: { 'Content-Type': 'application/json' }
});