import { createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router';
import PageRouter from './page/index';
import ViewsRouter from './views/index';
import AvueRouter from './avue-router';
import i18n from 'app/lang/index';
import { getStore } from 'utils/store';
import { VueI18n } from 'vue-i18n';

export interface ARouter {
	generateTitle: (item: RouterTag, props?: Partial<Menu>) => string;
	setTitle: (title?: string) => string;
	closeTag: (value?: string) => void;
	formatRoutes: (aMenu: RouterMenu[], first: boolean) => RouteRecordRaw[] | undefined;
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
	i18n: i18n.global as VueI18n
});
//解决pinia未挂载去调用useUserStore的问题
const menuAll = getStore<RouterMenu[]>({ name: 'menuAll' });
aRouter.$router.avueRouter?.formatRoutes(menuAll?.content || [], true);

export default aRouter.$router;
