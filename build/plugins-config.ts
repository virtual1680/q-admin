import vue from '@vitejs/plugin-vue';
import { createHtmlPlugin } from 'vite-plugin-html';
import { viteExternalsPlugin } from 'vite-plugin-externals';
import viteImagemin from 'vite-plugin-imagemin';
import { visualizer } from 'rollup-plugin-visualizer';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import vueJsx from '@vitejs/plugin-vue-jsx';
import importToCDN from 'vite-plugin-cdn-import';
import { viteMockServe } from 'vite-plugin-mock';
import { resolve } from 'path';
import { PluginOption } from 'vite';
import website from '../src/config/website';
export const pluginList = (viteEnv: ViteEnv) =>
	[
		vue(),
		viteMockServe({
			mockPath: 'mock',
			prodEnabled: true,
			injectCode: `import { setupProdMockServer } from './mockProdServer'; setupProdMockServer();`
		}),
		createHtmlPlugin({
			inject: {
				data: {
					title: website.indexTitle
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
					name: 'echarts',
					var: 'echarts',
					path: 'https://cdn.jsdelivr.net/npm/echarts@5.3.2/dist/echarts.min.js'
				}
			]
		}),
		// * 忽略打包
		viteExternalsPlugin({
			echarts: 'echarts'
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
			iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
			svgoOptions: true,
			// default
			symbolId: 'icon-[dir]-[name]'
		}),
		// * 依赖分析
		viteEnv.VITE_REPORT && visualizer()
	] as PluginOption[];
