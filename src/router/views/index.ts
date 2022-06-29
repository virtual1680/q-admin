import Layout from 'app/page/index/index.vue';
// import { useCommonStore } from 'store/common';
import { RouteRecordRaw } from 'vue-router';
export default [
	{
		path: '/wel',
		// useCommonStore().getIsMacOs ? import('@/mac/index.vue') :
		component: () => import('@/page/index/index.vue'),
		redirect: '/wel/index',
		children: [
			{
				path: 'index',
				name: '首页',
				meta: {
					i18n: 'dashboard'
				},
				component: () => import(/* webpackChunkName: "views" */ '@/views/wel/index.vue')
			},
			{
				path: 'more',
				name: '控制台',
				meta: {
					i18n: 'more',
					menu: false
				},
				component: () => import(/* webpackChunkName: "views" */ '@/views/wel/dashboard.vue')
			}
		]
	},
	// {
	// 	path: '/iframe',
	// 	component: Layout,
	// 	redirect: '/iframe',
	// 	children: [
	// 		{
	// 			path: '',
	// 			name: '',
	// 			component: () => import(/* webpackChunkName: "views" */ '@/components/iframe/main.vue')
	// 		}
	// 	]
	// },
	{
		path: '/info',
		component: Layout,
		redirect: '/info/index',
		children: [
			{
				path: 'index',
				name: '个人信息',
				meta: {
					i18n: 'info'
				},
				component: () => import(/* webpackChunkName: "views" */ '@/views/user/info.vue')
			},
			{
				path: 'setting',
				name: '个人设置',
				meta: {
					i18n: 'setting'
				},
				component: () => import(/* webpackChunkName: "views" */ '@/views/user/setting.vue')
			}
		]
	}
	// {
	// 	path: '/query',
	// 	component: Layout,
	// 	children: [
	// 		{
	// 			path: ':params',
	// 			name: '参数传递',
	// 			meta: {
	// 				activeMenu: '/params'
	// 			},
	// 			component: () => import(/* webpackChunkName: "views" */ '@/views/util/params.vue')
	// 		}
	// 	]
	// },
	// {
	// 	path: '/tabs',
	// 	component: Layout,
	// 	children: [
	// 		{
	// 			path: 'index',
	// 			name: '测试页面',
	// 			meta: {
	// 				isTab: false
	// 			},
	// 			component: () => import(/* webpackChunkName: "views" */ '@/views/util/test.vue')
	// 		}
	// 	]
	// },
	// {
	// 	path: '/detail/create',
	// 	component: Layout,
	// 	children: [
	// 		{
	// 			path: '',
	// 			name: (query: any) => {
	// 				return query.id ? '编辑页面' : '新增页面';
	// 			},
	// 			meta: {
	// 				activeMenu: '/detail'
	// 			},
	// 			component: () => import(/* webpackChunkName: "views" */ '@/views/util/detail.vue')
	// 		}
	// 	]
	// }
] as RouteRecordRaw[];
