// src/api.js
import axios from 'axios'

const isProd = import.meta.env.MODE === 'production'

export const api = axios.create({
	baseURL: isProd
		? 'https://taskhive-9zls.onrender.com/api' // production backend
		: '/api', // development (proxy via Vite)
	withCredentials: true,
})
