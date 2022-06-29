export const server = (viteEnv: ViteEnv) => {
	return {
		// fs: { strict: false },
		port: viteEnv.VITE_PORT,
		open: viteEnv.VITE_OPEN,
		overlay: {
			warning: false,
			error: true
		},
		proxy: {
			'/api': {
				target: viteEnv.VITE_API_URL,
				changeOrigin: true,
				ws: true,
				rewrite: (path: string) => path.replace(/^\/api/, '')
			}
		}
	};
};
export const preview = (viteEnv: ViteEnv) => {
	return {
		port: viteEnv.VITE_PORT + 1000,
		open: viteEnv.VITE_OPEN,
		proxy: {
			'/api': {
				target: viteEnv.VITE_API_URL,
				changeOrigin: true,
				ws: true,
				rewrite: (path: string) => path.replace(/^\/api/, '/')
			}
		}
	};
};
