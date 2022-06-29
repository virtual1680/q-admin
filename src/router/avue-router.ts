import { Router, RouteRecordRaw } from 'vue-router';
import { ARouter, AVueRouter } from 'router/index';
import website from 'app/config/website';
import { useTagsStore } from 'store/tags';
import { I18n } from 'vue-i18n';

const modules = import.meta.glob('../**/**/*.vue');
function isURL(s: string) {
	return /^http[s]?:\/\/.*/.test(s);
}

export default class RouterPlugin {
	public $router;
	public i18n;
	constructor(option: { router: Router; i18n: I18n<{ en: any; 'zh-cn': any }, unknown, unknown, true> }) {
		this.$router = option.router as AVueRouter;
		this.i18n = option.i18n.global;
		this.$router.avueRouter = this.init() as ARouter;
		return this;
	}
	init() {
		return {
			self: this,
			// 设置标题
			setTitle: (title: string) => {
				const defaultTitle = this.i18n.t('title');
				title = title ? `${title} | ${defaultTitle}` : defaultTitle;
				document.title = title;
			},
			closeTag(value?: string) {
				const tStore = useTagsStore();
				let tag = value || tStore.tag;
				if (typeof value === 'string') {
					// TODO
					console.log('-=-=-=-=', tStore.tagList[0]);
					tag = tStore.tagList.find((ele: any) => ele.fullPath === value);
				}
				tStore.DEL_TAG(tag);
			},
			generateTitle: (item: RouterMenu, props?: Partial<Menu>) => {
				let query = item[props?.query || 'query'] || {};
				let title = query.name || item[props?.label || 'label'];
				let meta = item[props?.meta || 'meta'] || {};
				let key = meta.i18n;
				if (key) {
					const hasKey = this.i18n.te('route.' + key);
					if (hasKey) return this.i18n.t('route.' + key);
				}
				return title;
			},
			//动态路由
			formatRoutes: function (aMenu: RouterMenu[] = [], first: boolean = false): RouteRecordRaw[] | undefined {
				// const cStore = useCommonStore();
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
					aRouter.forEach(ele => this.self.$router.addRoute(ele));
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
