import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			'/api': {
				target: 'https://taskhive-9zls.onrender.com',
				changeOrigin: true,
				secure: false,
			},
		},
	},
	base: '/TASKHIVE/', // for GitHub Pages build
})
