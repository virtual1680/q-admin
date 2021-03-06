import router, { AVueRouter } from './router/';
import { useUserStore, useCommonStore, useTagsStore } from 'store/index';
import { AxiosCanceler } from 'http/cancel';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import { LocationQuery } from 'vue-router';
NProgress.configure({ showSpinner: false });

const axiosCanceler = new AxiosCanceler();
const lockPage = '/lock'; //锁屏页
router.beforeEach((to, from, next) => {
	//路由切换时取消所有正在执行的请求
	axiosCanceler.removeAllPending();
	const uStore = useUserStore();
	const cStore = useCommonStore();
	const tStore = useTagsStore();
	const meta = to.meta || {};
	const isMenu = meta.menu === undefined ? to.query.menu : meta.menu;
	cStore.SET_IS_MENU(isMenu === undefined);
	if (uStore.token) {
		if (cStore.getIsLock && to.path != lockPage) {
			//如果系统激活锁屏，全部跳转到锁屏页
			next({ path: lockPage });
		} else if (to.path === '/login') {
			//如果登录成功访问登录页跳转到主页
			next({ path: '/' });
		} else {
			//如果用户信息为空则获取用户信息，获取用户信息失败，跳转到登录页
			if (uStore.roles.length === 0) {
				uStore
					.GetUserInfo()
					.then(() => {
						next({ ...to, replace: true });
					})
					.catch(() => {
						uStore.FedLogOut().then(() => {
							next({ path: '/login' });
						});
					});
			} else {
				const meta = to.meta || {};
				const query: LocationQuery = to.query;
				if (meta.target) {
					window.open((query.url as string).replace(/#/g, '&'));
					return;
				} else if (meta.isTab !== false) {
					const name: string = query.name ? (query.name as string) : (to.name as string) || '-';
					tStore.ADD_TAG({
						label: name,
						path: to.path,
						fullPath: to.fullPath,
						params: to.params,
						query: to.query,
						meta: meta
					});
				}
				next();
			}
		}
	} else {
		//判断是否需要认证，没有登录访问去登录页
		if (meta.isAuth === false) {
			next();
		} else {
			next('/login');
		}
	}
});

router.afterEach(to => {
	const cStore = useCommonStore();
	NProgress.done();
	let title = (router as AVueRouter).avueRouter?.generateTitle({ label: (to.name as string) || '-', ...to });
	(router as AVueRouter).avueRouter?.setTitle(title);
	cStore.SET_IS_SEARCH(false);
});
