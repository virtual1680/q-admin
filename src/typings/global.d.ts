// * .env
declare type Recordable<T = any> = Record<string, T>;

declare interface ViteEnv {
	VITE_API_URL: string;
	VITE_PORT: number;
	VITE_OPEN: boolean;
	VITE_GLOB_APP_TITLE: string;
	VITE_DROP_CONSOLE: boolean;
	VITE_PROXY_URL: string;
	VITE_BUILD_GZIP: boolean;
	VITE_REPORT: boolean;
}

// * http
declare interface Result<T = any> {
	code: number;
	msg: string;
	data: T;
}
declare interface Setting {
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
declare interface Menu {
	parentId: string;
	iconDefault: string;
	label: string;
	path: string;
	icon: string;
	children: string;
	query: string;
	href: string;
	fullPath: string;
	meta: string; //TODO { keepAlive?: boolean; isTab?: boolean; isAuth?: boolean }
	name: string;
}

declare interface RouterMenu {
	parentId: string;
	iconDefault: string;
	label: string;
	path: string;
	icon: string;
	iconBgColor: string;
	children: RouterMenu[];
	query: LocationQueryRaw;
	href: string;
	fullPath: string;
	meta: { keepAlive?: boolean; isTab?: boolean; isAuth?: boolean; i18n?: string };
	name: string;
	component: string;
}
declare interface Website {
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
