import { createRouter, createWebHistory, Router } from 'vue-router';
import PageRouter from './page/index';
import ViewsRouter from './views/index';
import AvueRouter from './avue-router';
import i18n from 'app/lang/index';
// import { userStore } from '@/store/user';

export interface ARouter {
	generateTitle: (item: Menu, props?: Partial<Menu>) => string;
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

aRouter.$router.avueRouter?.formatRoutes([], true);

export default Router;
