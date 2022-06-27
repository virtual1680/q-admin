// import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
// // import { getToken } from "utils/token";
// import { AxiosCanceler } from 'http/cancel';
// // import { removeToken, removeRefreshToken } from "utils/token";
// const axiosCanceler = new AxiosCanceler();
// const routes: Array<RouteRecordRaw> = [
// 	{
// 		path: '/',
// 		name: 'Login',
// 		component: () => import(/* webpackChunkName: "Login" */ 'views/login/index.vue')
// 	},
// 	{
// 		path: '/',
// 		name: 'Home',
// 		component: () => import(/* webpackChunkName: "home" */ 'views/home/index.vue')
// 	}
// ];

// const router = createRouter({
// 	history: createWebHistory(),
// 	routes
// });

// router.beforeEach((to, from, next) => {
// 	//路由切换时取消所有正在执行的请求
// 	axiosCanceler.removeAllPending();
// 	next();
// 	// if (getToken()) {
// 	// 	if (to.path === '/login') {
// 	// 		next({ path: '/' })
// 	// 	} else {
// 	// 		next()
// 	// 	}
// 	// } else {
// 	// 	if (to.path === '/login') {
// 	// 		next()
// 	// 	} else {
// 	// 		next({ path: '/login' })
// 	// 	}
// 	// }
// });

// export default router;

import { createRouter, createWebHistory } from 'vue-router';
import PageRouter from './page/index';
import ViewsRouter from './views/index';
import AvueRouter from './avue-router1';
import i18n from 'app/lang/index';
import { userStore } from 'store/user';
import { commonStore } from 'store/common';
import { tagsStore } from 'store/tags';

//创建路由
const Router = createRouter({
	history: createWebHistory(),
	routes: [...PageRouter, ...ViewsRouter]
});

const avueRouter = new AvueRouter({
	userStore: userStore(),
	commonStore: commonStore(),
	tagsStore: tagsStore(),
	router: Router,
	i18n: i18n
});

avueRouter.$router.$avueRouter.formatRoutes(userStore().menuAll, true);

export default avueRouter.$router;
