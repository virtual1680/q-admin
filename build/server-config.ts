export const server = (env: Record<string, string>) => {
	return {
		// fs: { strict: false },
		port: env.VITE_PORT,
		open: env.VITE_OPEN,
		overlay: {
			warning: false,
			error: true
		},
		proxy: {
			'/api': {
				target: env.VITE_API_URL,
				changeOrigin: true,
				ws: true,
				rewrite: (path: string) => path.replace(/^\/api/, '')
			}
		}
	};
};
export const preview = (env: Record<string, string>) => {
	return {
		port: env.VITE_PORT + 1000,
		open: env.VITE_OPEN,
		proxy: {
			'/api': {
				target: env.VITE_API_URL,
				changeOrigin: true,
				ws: true,
				rewrite: (path: string) => path.replace(/^\/api/, '/')
			}
		}
	};
};
