import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// import { getToken } from "utils/token";
import { AxiosCanceler } from "http/cancel";
// import { removeToken, removeRefreshToken } from "utils/token";
const axiosCanceler = new AxiosCanceler();
const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "Home",
		component: () => import(/* webpackChunkName: "home" */ "views/home/index.vue")
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes
});

router.beforeEach((to, from, next) => {
	//路由切换时取消所有正在执行的请求
	axiosCanceler.removeAllPending();
	next();
	// if (getToken()) {
	// 	if (to.path === '/login') {
	// 		next({ path: '/' })
	// 	} else {
	// 		next()
	// 	}
	// } else {
	// 	if (to.path === '/login') {
	// 		next()
	// 	} else {
	// 		next({ path: '/login' })
	// 	}
	// }
});

export default router;
