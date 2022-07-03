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
	meta: string;
	name: string;
}

declare interface RouterMenu {
	id?: string;
	parentId: string;
	iconDefault: string;
	label: string;
	path: string;
	icon: string;
	iconBgColor: string;
	children: RouterMenu[];
	query: Record<string, string | null | (string | null)[]>;
	params: Record<string, string | string[]>;
	href: string;
	fullPath: string;
	meta: { keepAlive?: boolean; isTab?: boolean; isAuth?: boolean; i18n?: string; roles?: string[] };
	name?: string | ((query: LocationQueryRaw) => string);
	component: string;
	iconColor?: string;
	hideInDesktop?: boolean;
}

declare type RouterTag = Pick<RouterMenu, 'fullPath' | 'meta' | 'name' | 'params' | 'query' | 'path'>;

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
