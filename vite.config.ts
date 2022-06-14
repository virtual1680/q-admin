import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { viteExternalsPlugin } from 'vite-plugin-externals';
import viteImagemin from 'vite-plugin-imagemin';
import { visualizer } from 'rollup-plugin-visualizer';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	console.log(command, mode, '开始加载配置文件-=-=-=-=-=-=');
	return {
		base: './',
		resolve: {
			alias: {
				app: resolve(__dirname, 'src'),
				assets: resolve(__dirname, 'src/assets'),
				components: resolve(__dirname, 'src/components'),
				api: resolve(__dirname, 'src/api'),
				router: resolve(__dirname, 'src/router'),
				views: resolve(__dirname, 'src/views'),
				utils: resolve(__dirname, 'src/utils'),
			},
		},
		server: {
			fs: { strict: false },
			port: 3000,
			proxy: {
				'/api': {
					// target: 'http://trace.leliven.com:8080/',
					target: 'http://10.10.1.152:13002/',
					changeOrigin: true,
					rewrite: path => path.replace(/^\/api/, '/'),
				},
			},
		},
		build: {
			sourcemap: false,
			rollupOptions: {
				output: {
					// 拆分代码
					manualChunks: {
						vue: ['vue', 'vue-router'], // 如果打包有BUG请屏蔽
						'element-plus': ['element-plus'],
					},
				},
			},
		},
		plugins: [
			vue(),
			//忽略打包
			viteExternalsPlugin({
				echarts: 'echarts',
				// axios: 'axios',
			}),
			//图片压缩
			viteImagemin({
				gifsicle: { optimizationLevel: 7, interlaced: false },
				optipng: { optimizationLevel: 7 },
				webp: { quality: 75 },
				mozjpeg: { quality: 65 },
				pngquant: { quality: [0.65, 0.9], speed: 4 },
				svgo: {
					plugins: [{ removeViewBox: false }, { removeEmptyAttrs: false }],
				},
			}),
			//svg icon
			createSvgIconsPlugin({
				iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
				svgoOptions: true,
				// default
				symbolId: 'icon-[dir]-[name]',
			}),
			//依赖分析
			visualizer(),
		],
	};
});
