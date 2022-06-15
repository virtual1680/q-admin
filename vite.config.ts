import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { createHtmlPlugin } from "vite-plugin-html";
import { resolve } from "path";
import { viteExternalsPlugin } from "vite-plugin-externals";
import viteImagemin from "vite-plugin-imagemin";
import { visualizer } from "rollup-plugin-visualizer";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { wrapperEnv } from "./src/utils/getEnv";
import importToCDN from "vite-plugin-cdn-import";
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	console.log(command, mode, "开始加载配置文件-=-=-=-=-=-=");
	const env = loadEnv(mode, process.cwd());
	const viteEnv = wrapperEnv(env);
	return {
		// base: "./",
		resolve: {
			alias: {
				app: resolve(__dirname, "src"),
				assets: resolve(__dirname, "src/assets"),
				components: resolve(__dirname, "src/components"),
				api: resolve(__dirname, "src/api"),
				router: resolve(__dirname, "src/router"),
				views: resolve(__dirname, "src/views"),
				http: resolve(__dirname, "src/http"),
				store: resolve(__dirname, "src/store"),
				utils: resolve(__dirname, "src/utils")
			}
		},
		server: {
			fs: { strict: false },
			port: viteEnv.VITE_PORT,
			open: viteEnv.VITE_OPEN,
			proxy: {
				"/api": {
					// target: 'http://trace.leliven.com:8080/',
					target: "http://10.10.1.152:13002/",
					changeOrigin: true,
					rewrite: path => path.replace(/^\/api/, "/")
				}
			}
		},
		preview: {
			port: viteEnv.VITE_PORT + 1000,
			open: viteEnv.VITE_OPEN,
			proxy: {
				"/api": {
					// target: 'http://trace.leliven.com:8080/',
					target: "http://test.gateway.community.leliven.com/",
					changeOrigin: true,
					rewrite: path => path.replace(/^\/api/, "/")
				}
			}
		},
		esbuild: {
			pure: viteEnv.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : []
		},
		build: {
			sourcemap: false,
			// esbuild 打包更快，但是不能去除 console.log
			// minify: "esbuild",
			// minify: "terser",
			rollupOptions: {
				output: {
					// 拆分代码
					manualChunks: {
						vue: ["vue", "vue-router"], // 如果打包有BUG请屏蔽
						"element-plus": ["element-plus"]
					}
					// chunkFileNames: "assets/js/[name]-[hash].js",
					// entryFileNames: "assets/js/[name]-[hash].js",
					// assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
				}
			}
		},
		plugins: [
			vue(),
			createHtmlPlugin({
				inject: {
					data: {
						title: viteEnv.VITE_GLOB_APP_TITLE
					}
				}
			}),
			// * 可以使用 jsx/tsx 语法
			vueJsx(),
			// * name 可以写在 script 标签上
			VueSetupExtend(),
			// * cdn 引入
			importToCDN({
				modules: [
					{
						name: "echarts",
						var: "echarts",
						path: "https://cdn.jsdelivr.net/npm/echarts@5.3.2/dist/echarts.min.js"
					}
				]
			}),
			// * 忽略打包
			viteExternalsPlugin({
				echarts: "echarts"
				// axios: 'axios',
			}),
			// * 图片压缩
			viteImagemin({
				gifsicle: { optimizationLevel: 7, interlaced: false },
				optipng: { optimizationLevel: 7 },
				webp: { quality: 75 },
				mozjpeg: { quality: 65 },
				pngquant: { quality: [0.65, 0.9], speed: 4 },
				svgo: {
					plugins: [{ removeViewBox: false }, { removeEmptyAttrs: false }]
				}
			}),
			// * svg icon
			createSvgIconsPlugin({
				iconDirs: [resolve(process.cwd(), "src/assets/svg")],
				svgoOptions: true,
				// default
				symbolId: "icon-[dir]-[name]"
			}),
			// * 依赖分析
			viteEnv.VITE_REPORT && visualizer()
		]
	};
});
