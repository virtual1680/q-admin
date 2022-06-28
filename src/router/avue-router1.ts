import website, { Menu } from 'app/config/website';
import { Router } from 'vue-router';
// import { userStore } from 'store/user';
import { commonStore } from 'store/common';
import { tagsStore } from 'store/tags';

const modules = import.meta.glob('../**/**/*.vue');
function isURL(s: string) {
	return /^http[s]?:\/\/.*/.test(s);
}
export default class RouterPlugin {
	public $router;
	constructor(option: any) {
		this.$router = option.router as Router & { $avueRouter: any };
		let i18n = option.i18n.global;
		this.$router.$avueRouter = this.init(i18n);
		return this;
	}
	init(i18n: any) {
		return {
			self: this,
			// 设置标题
			setTitle: (title: string) => {
				const defaultTitle = i18n.t('title');
				title = title ? `${title} | ${defaultTitle}` : defaultTitle;
				document.title = title;
			},
			closeTag(value: string) {
				const tStore = tagsStore();
				let tag = value || tStore.tag;
				if (typeof value === 'string') {
					tag = tStore.tagList.find((ele: any) => ele.fullPath === value);
				}
				tStore.DEL_TAG(tag);
			},
			generateTitle: (item: Menu, props: Partial<Menu>) => {
				let query = item[props.query || 'query'] || {};
				let title = query.name || item[props.label || 'label'];
				let meta = item[props.meta || 'meta'] || {};
				let key = meta.i18n;
				if (key) {
					const hasKey = i18n.te('route.' + key);
					if (hasKey) return i18n.t('route.' + key);
				}
				return title;
			},
			//动态路由
			formatRoutes: function (aMenu: any[] = [], first: boolean = false) {
				const cStore = commonStore();
				const aRouter = [];
				const propsDefault = website.menu;
				if (aMenu && aMenu.length === 0) return;
				for (let i = 0; i < aMenu.length; i++) {
					const oMenu = aMenu[i] as any;
					let path = oMenu[propsDefault.path],
						component = oMenu.component,
						name = oMenu[propsDefault.label],
						icon = oMenu[propsDefault.icon],
						children = oMenu[propsDefault.children] as any[],
						query = oMenu[propsDefault.query],
						meta = oMenu[propsDefault.meta];
					// TODO 是否直接在meta中设置
					// if (option.keepAlive) {
					// 	meta.keepAlive = option.keepAlive;
					// }
					const isChild = !!(children && children.length !== 0);
					const oRouter = {
						path: path,
						component: (() => {
							// 判断是否为首路由
							if (first) {
								return modules[cStore.getIsMacOs ? '../page/index/layout.vue' : '../page/index/index.vue'];
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
							: ((): any => {
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

export const formatPath = (ele: any, first: boolean = false) => {
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
			ele[propsDefault.children].forEach((child: any) => {
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
