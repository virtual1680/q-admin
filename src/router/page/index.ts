// import { commonStore } from 'store/common';
import { RouteRecordRaw } from 'vue-router';
export default [
	{
		path: '/login',
		name: '登录页',
		// commonStore().getIsMacOs ? import('app/mac/login.vue') :
		component: () => import('app/page/login/index.vue'),
		meta: {
			keepAlive: true,
			isTab: false,
			isAuth: false
		}
	},
	{
		path: '/lock',
		name: '锁屏页',
		// commonStore().getIsMacOs ? import('app/mac/lock.vue') :
		component: () => import('app/page/lock/index.vue'),
		meta: {
			keepAlive: true,
			isTab: false,
			isAuth: false
		}
	},
	{
		path: '/404',
		component: () => import(/* webpackChunkName: "page" */ 'app/components/error-page/404.vue'),
		name: '404',
		meta: {
			keepAlive: true,
			isTab: false,
			isAuth: false
		}
	},
	{
		path: '/403',
		component: () => import(/* webpackChunkName: "page" */ 'app/components/error-page/403.vue'),
		name: '403',
		meta: {
			keepAlive: true,
			isTab: false,
			isAuth: false
		}
	},
	{
		path: '/500',
		component: () => import(/* webpackChunkName: "page" */ 'app/components/error-page/500.vue'),
		name: '500',
		meta: {
			keepAlive: true,
			isTab: false,
			isAuth: false
		}
	},
	{
		path: '/',
		name: '主页',
		redirect: '/wel'
	}
] as RouteRecordRaw[];
