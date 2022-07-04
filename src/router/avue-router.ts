import { Router, RouteRecordRaw } from 'vue-router';
import { ARouter, AVueRouter } from 'router/index';
import website from 'app/config/website';
import { useTagsStore } from 'store/tags';
import { VueI18n } from 'vue-i18n';

const modules = import.meta.glob('../**/**/*.vue');
function isURL(s: string) {
	return /^http[s]?:\/\/.*/.test(s);
}

export default class RouterPlugin {
	public $router;
	public $i18n;
	constructor(option: { router: Router; i18n: VueI18n }) {
		this.$router = option.router as AVueRouter;
		this.$i18n = option.i18n;
		this.$router.avueRouter = this.init() as ARouter;
		return this;
	}
	init() {
		const router = this.$router;
		const i18n = this.$i18n;
		return {
			// 设置标题
			setTitle: (title: string) => {
				const defaultTitle = i18n.t('title');
				title = title ? `${title} | ${defaultTitle}` : defaultTitle;
				document.title = title;
			},
			closeTag(value?: string) {
				const tStore = useTagsStore();
				let fullPath = value || tStore.tag.fullPath;
				// if (typeof value === 'string') {
				// 	tag = tStore.tagList.find((ele: RouterMenu) => ele.fullPath === fullPath);
				// }
				tStore.DEL_TAG(fullPath);
			},
			generateTitle: (item: RouterTag, props?: Partial<Menu>) => {
				let query = item[props?.query || 'query'] || {};
				// console.log(props?.label, item[props?.label || 'name']);

				let title = query.name || item[props?.label || 'label'];
				let meta: RouterTag['meta'] = item[props?.meta || 'meta'] || {};
				let key = meta.i18n;
				if (key) {
					const hasKey = i18n.te('route.' + key);
					if (hasKey) return i18n.t('route.' + key);
				}
				return title;
			},
			//动态路由
			formatRoutes: function (aMenu: RouterMenu[] = [], first: boolean = false): RouteRecordRaw[] | undefined {
				const aRouter = [];
				const propsDefault = website.menu;
				if (aMenu && aMenu.length === 0) return;
				for (let i = 0; i < aMenu.length; i++) {
					const oMenu = aMenu[i];
					let path = oMenu[propsDefault.path],
						component = oMenu.component,
						name = oMenu[propsDefault.label],
						icon = oMenu[propsDefault.icon],
						children = oMenu[propsDefault.children],
						query = oMenu[propsDefault.query],
						meta = oMenu[propsDefault.meta];
					// 去除在option中设置keepAlive
					// if (option.keepAlive) {
					// 	meta.keepAlive = option.keepAlive;
					// }
					// 将parentId 存入meta中，开启导航级联的情况下会根据parentId去选中top-menu
					if (oMenu.parentId !== '' && oMenu.parentId !== undefined) {
						meta.parentId = oMenu.parentId;
					}
					const isChild = !!(children && children.length !== 0);
					const oRouter = {
						path: path,
						component: (() => {
							// 判断是否为首路由
							if (first) {
								const commonStore = window.localStorage.getItem('CommonStore');
								let isMacOs = false;
								if (commonStore) {
									isMacOs = JSON.parse(commonStore).isMacOs;
								}
								return modules[isMacOs ? '../page/index/layout.vue' : '../page/index/index.vue'];
								// 判断是否为多层路由
							} else if (isChild && !first) {
								return modules['../page/index/layout.vue'];
								// 判断是否为最终的页面视图
							} else {
								let result = modules[`../${component}.vue`];
								result().then(mod => (mod.default.name = path));
								return result;
							}
						})(),
						name,
						icon,
						meta,
						query,
						redirect: (() => {
							if (!isChild && first) return `${path}`;
							else return '';
						})(),
						// 处理是否为一级路由
						children: !isChild
							? (() => {
									if (first) {
										oMenu[propsDefault.path] = `${path}`;
										let result = modules[`../${component}.vue`];
										result().then(mod => (mod.default.name = path));
										return [
											{
												component: result,
												icon: icon,
												name: name,
												meta: meta,
												query: query,
												path: ''
											}
										];
									}
									return [];
							  })()
							: ((): RouteRecordRaw[] | undefined => {
									return this.formatRoutes(children, false);
							  })()
					};
					if (!isURL(path)) aRouter.push(oRouter);
				}
				if (first) {
					aRouter.forEach(ele => router.addRoute(ele));
				} else {
					return aRouter;
				}
			}
		};
	}
}

export const formatPath = (ele: RouterMenu, first: boolean = false) => {
	const propsDefault = website.menu;
	const icon = ele[propsDefault.icon];
	ele[propsDefault.icon] = !icon ? propsDefault.iconDefault : icon;
	ele.meta = ele.meta || {};
	const iframeComponent = 'components/iframe/main';
	const iframeSrc = (href: string) => {
		return href.replace(/&/g, '#');
	};
	const isChild = !!(ele[propsDefault.children] && ele[propsDefault.children].length !== 0);
	if (!isChild && first) {
		ele[propsDefault.path] = ele[propsDefault.path];
		if (isURL(ele[propsDefault.href])) {
			let href = ele[propsDefault.href];
			ele.component = iframeComponent;
			ele[propsDefault.query] = { url: iframeSrc(href) };
		}
	} else {
		ele[propsDefault.children] &&
			ele[propsDefault.children].forEach((child: RouterMenu) => {
				if (isURL(child[propsDefault.href])) {
					let href = child[propsDefault.href];
					child.component = iframeComponent;
					child[propsDefault.query] = { url: iframeSrc(href) };
				}
				child[propsDefault.path] = `${ele[propsDefault.path]}/${child[propsDefault.path]}`;
				formatPath(child);
			});
	}
};
