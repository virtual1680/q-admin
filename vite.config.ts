import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import { pluginList } from './build/plugins-config';
// import { server, preview } from './build/server-config';
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	console.log(command, mode, '开始加载配置文件-=-=-=-=-=-=');
	const env = loadEnv(mode, process.cwd());
	console.log(env.VITE_GLOB_APP_TITLE);

	return {
		base: env.VITE_BASE_URL,
		resolve: {
			alias: {
				'@': resolve(__dirname, 'src'),
				app: resolve(__dirname, 'src'),
				config: resolve(__dirname, 'config'),
				assets: resolve(__dirname, 'src/assets'),
				components: resolve(__dirname, 'src/components'),
				api: resolve(__dirname, 'src/api'),
				router: resolve(__dirname, 'src/router'),
				views: resolve(__dirname, 'src/views'),
				http: resolve(__dirname, 'src/http'),
				store: resolve(__dirname, 'src/store'),
				utils: resolve(__dirname, 'src/utils')
			}
		},
		// server: server(env),
		// preview: preview(env),
		esbuild: {
			pure: env.VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : []
		},
		build: {
			sourcemap: true,
			minify: 'terser' //esbuild // esbuild 打包更快，但是不能去除 console.log
			// rollupOptions: {
			// 	output: {
			// format: 'es',
			// 拆分代码
			// manualChunks: {
			// 	'element-plus': ['element-plus']
			// }
			// chunkFileNames: "assets/js/[name]-[hash].js",
			// entryFileNames: "assets/js/[name]-[hash].js",
			// assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
			// 	}
			// }
		},
		plugins: pluginList(env)
	};
});
