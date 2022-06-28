export interface Setting {
	sidebar: string;
	tag: boolean;
	debug: boolean;
	collapse: boolean;
	search: boolean;
	lock: boolean;
	screenshot: boolean;
	fullscren: boolean;
	theme: boolean;
	menu: boolean;
}
export interface Menu {
	iconDefault: string;
	label: string;
	path: string;
	icon: string;
	children: string;
	query: string;
	href: string;
	meta: string;
}
export interface Website {
	title: string;
	logo: string;
	key: string; //配置主键,目前用于存储
	indexTitle: string;
	tokenTime: number; //token过期时间
	Authorization: string;
	//http的status默认放行不才用统一处理的,
	statusWhiteList: number[];
	//配置首页不可关闭
	setting: Setting;
	fistPage: {
		name: string;
		path: string;
	};
	//配置菜单的属性
	menu: Menu;
}

// * 全局配置文件
export default {
	title: 'Avue',
	logo: 'A',
	key: 'avue', //配置主键,目前用于存储
	indexTitle: '后台快速开发模版',
	tokenTime: 6000, //token过期时间
	Authorization: 'Authorization',
	//http的status默认放行不才用统一处理的,
	statusWhiteList: [400],
	//配置首页不可关闭
	setting: {
		sidebar: 'vertical',
		tag: true,
		debug: true,
		collapse: true,
		search: true,
		lock: true,
		screenshot: true,
		fullscren: true,
		theme: true,
		menu: true
	},
	fistPage: {
		name: '首页',
		path: '/wel/index'
	},
	//配置菜单的属性
	menu: {
		iconDefault: 'icon-caidan',
		label: 'label',
		path: 'path',
		icon: 'icon',
		children: 'children',
		query: 'query',
		href: 'href',
		meta: 'meta'
	}
} as Website;
