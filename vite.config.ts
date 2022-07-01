import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import { pluginList } from './build/plugins-config';
// import commonjs from 'rollup-plugin-commonjs';
// import externalGlobals from 'rollup-plugin-external-globals';
// import { server, preview } from './build/server-config';
// let globals = externalGlobals({
// vue: 'Vue',
// 'vue-i18n': 'VueI18n',
// 'vue-router': 'VueRouter',
// 'element-plus': 'ElementPlus',
// // axios: 'axios',
// pinia: 'Pinia',
// '@smallwei/avue': 'AVUE'
// });
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
		plugins: pluginList(env, mode),
		// server: server(viteEnv),
		// preview: preview(viteEnv),
		esbuild: {
			pure: env.VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : []
		},
		build: {
			sourcemap: true,
			minify: 'terser', //esbuild // esbuild 打包更快，但是不能去除 console.log
			rollupOptions: {
				// 'vue', 'vue-i18n', 'pinia', 'vue-router', 'element-plus',
				// external: ['@smallwei/avue'],
				// output: {
				// 	globals: {
				// 		vue: 'Vue'
				// 	}
				// },
				// plugins: [globals],
				output: {
					// format: 'es',
					// globals: {
					// 	vue: 'vue',
					// 	'vue-router': 'VueRouter'
					// }
					// manualChunks: {
					// 	vue: ['vue', 'vue-router'], // 如果打包有BUG请屏蔽
					// 	'element-plus': ['element-plus']
					// }
				}
				// output: {
				// 拆分代码

				// globals: {
				// 	vue: 'Vue'
				// 	'vue-router': 'VueRouter'
				// }
				// chunkFileNames: "assets/js/[name]-[hash].js",
				// entryFileNames: "assets/js/[name]-[hash].js",
				// assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
				// }
			}
		}
	};
});
