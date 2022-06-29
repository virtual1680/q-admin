import { createRouter, createWebHistory, Router } from 'vue-router';
import PageRouter from './page/index';
import ViewsRouter from './views/index';
import AvueRouter from './avue-router';
import i18n from 'app/lang/index';
// import { userStore } from '@/store/user';

export interface ARouter {
	generateTitle: (item: RouterMenu, props?: Partial<Menu>) => string;
	setTitle: (title?: string) => string;
	closeTag: (value: string) => void;
	formatRoutes: (aMenu: any[], first: boolean) => any;
	self: any;
}
export interface AVueRouter extends Router {
	avueRouter?: ARouter;
}

//创建路由
const Router = createRouter({
	history: createWebHistory(),
	routes: [...PageRouter, ...ViewsRouter] //
});

const aRouter = new AvueRouter({
	router: Router,
	i18n: i18n
});
//解决pinia未挂载去调用useUserStore的问题
const userStore = window.localStorage.getItem('UserStore');
if (userStore) {
	aRouter.$router.avueRouter?.formatRoutes(JSON.parse(userStore).menuAll || [], true);
}

export default aRouter.$router;
