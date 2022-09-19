function randomColor() {
	return '#' + Math.random().toString(16).substr(2, 6).toUpperCase();
}
const top = [
	{
		label: '首页',
		path: '/wel/index',
		icon: 'el-icon-document',
		meta: {
			i18n: 'dashboard'
		},
		parentId: 0
	},
	{
		label: '测试',
		icon: 'el-icon-document',
		path: '/form',
		meta: {
			i18n: 'test'
		},
		parentId: 1
	},
	{
		label: '更多',
		icon: 'el-icon-document',
		path: '/wel/more',
		meta: {
			menu: false,
			i18n: 'more'
		},
		parentId: 2
	}
];
const first = [
	{
		parentId: 0,
		label: '缓冲',
		path: '/cache',
		component: 'views/util/cache',
		icon: 'icon-caidan',
		iconBgColor: randomColor(),
		meta: {
			i18n: 'cache',
			keepAlive: true
		},
		children: []
	},
	{
		parentId: 0,
		label: '参数',
		path: '/params',
		component: 'views/util/params',
		icon: 'icon-caidan',
		iconBgColor: randomColor(),
		meta: {
			i18n: 'params'
		}
	},
	{
		parentId: 0,
		label: '详情页',
		path: '/detail',
		component: 'views/util/detail',
		icon: 'icon-caidan',
		iconBgColor: randomColor(),
		meta: {
			i18n: 'detail'
		}
	},
	{
		parentId: 0,
		label: '标签',
		path: '/tags',
		component: 'views/util/tags',
		icon: 'icon-caidan',
		iconBgColor: randomColor(),
		meta: {
			i18n: 'tags'
		},
		children: []
	},
	{
		parentId: 0,
		label: '存储',
		path: '/store',
		component: 'views/util/store',
		icon: 'icon-caidan',
		iconBgColor: randomColor(),
		meta: {
			i18n: 'store'
		},
		children: []
	},
	{
		parentId: 0,
		label: '日志监控',
		path: '/logs',
		component: 'views/util/logs',
		icon: 'icon-caidan',
		iconBgColor: randomColor(),
		meta: {
			i18n: 'logs'
		},
		children: []
	},
	{
		parentId: 0,
		label: '返回顶部',
		path: '/top',
		component: 'views/util/top',
		icon: 'icon-caidan',
		iconBgColor: randomColor(),
		meta: {
			i18n: 'top'
		},
		children: []
	},
	{
		parentId: 0,
		label: '图钉',
		path: '/affix',
		component: 'views/util/affix',
		icon: 'icon-caidan',
		iconBgColor: randomColor(),
		meta: {
			i18n: 'affix'
		},
		children: []
	},
	{
		parentId: 0,
		label: '多级菜单',
		path: '/deep',
		iconBgColor: randomColor(),
		children: [
			{
				label: '多级菜单1-1',
				path: 'deep',
				iconBgColor: randomColor(),
				children: [
					{
						label: '多级菜单2-1',
						path: 'deep',
						iconBgColor: randomColor(),
						component: 'views/util/deep'
					}
				]
			}
		]
	},
	{
		parentId: 0,
		label: '外部页面',
		path: '/out',
		icon: 'icon-caidan',
		iconBgColor: randomColor(),
		meta: {
			i18n: 'out'
		},
		children: [
			{
				label: '官方网站(内嵌页面)',
				path: 'website',
				href: 'https://avuejs.com',
				icon: 'icon-caidan',
				iconBgColor: randomColor(),
				meta: {
					i18n: 'website'
				}
			},
			{
				label: '全局函数(外链页面)',
				path: 'api',
				href: 'https://avuejs.com/docs/api?test1=1&test2=2',
				icon: 'icon-caidan',
				iconBgColor: randomColor(),
				meta: {
					target: '_blank',
					i18n: 'api'
				}
			}
		]
	},
	{
		parentId: 0,
		label: '通用模板',
		path: '/crud',
		component: 'views/util/crud',
		icon: 'icon-caidan',
		iconBgColor: randomColor(),
		meta: {
			i18n: 'crud'
		},
		children: []
	},
	{
		parentId: 0,
		label: '表格',
		path: '/table',
		component: 'views/util/table',
		icon: 'icon-caidan',
		iconBgColor: randomColor(),
		meta: {
			i18n: 'table'
		},
		children: []
	},
	{
		parentId: 0,
		label: '表单',
		path: '/form',
		component: 'views/util/form',
		icon: 'icon-caidan',
		iconBgColor: randomColor(),
		meta: {
			i18n: 'form'
		},
		children: []
	},
	{
		parentId: 0,
		label: '异常页',
		path: '/error',
		meta: {
			i18n: 'error'
		},
		icon: 'icon-caidan',
		iconBgColor: randomColor(),
		children: [
			{
				label: 'error403',
				path: 'error',
				component: 'components/error-page/403',
				icon: 'icon-caidan',
				iconBgColor: randomColor(),
				children: []
			},
			{
				label: 'error404',
				path: '404',
				component: 'components/error-page/404',
				icon: 'icon-caidan',
				iconBgColor: randomColor(),
				children: []
			},
			{
				label: 'error500',
				path: '500',
				component: 'components/error-page/500',
				icon: 'icon-caidan',
				iconBgColor: randomColor(),
				children: []
			}
		]
	},
	{
		parentId: 0,
		label: '关于',
		path: '/about',
		component: 'views/util/about',
		icon: 'icon-caidan',
		iconBgColor: randomColor(),
		meta: {
			i18n: 'about'
		},
		children: []
	}
];
const second = [
	{
		parentId: 1,
		label: 'FORM表单',
		path: '/form',
		icon: 'icon-caidan',
		children: [
			{
				label: '基础',
				path: 'basics',
				component: 'views/form/basics',
				iconBgColor: randomColor(),
				icon: 'icon-caidan',
				children: []
			},
			{
				label: '标题字段宽度',
				path: 'title-width',
				component: 'views/form/title-width',
				icon: 'icon-caidan',
				iconBgColor: randomColor(),
				children: []
			},
			{
				label: '隐藏字段',
				path: 'display',
				component: 'views/form/display',
				icon: 'icon-caidan',
				iconBgColor: randomColor(),
				children: []
			},
			{
				label: '自定义卡槽',
				path: 'custom-slot',
				component: 'views/form/custom-slot',
				icon: 'icon-caidan',
				children: []
			},
			{
				label: '数据默认值',
				path: 'data-default',
				component: 'views/form/data-default',
				icon: 'icon-caidan',
				children: []
			},
			{
				label: '数据验证',
				path: 'data-validate',
				component: 'views/form/data-validate',
				icon: 'icon-caidan',
				children: []
			},
			{
				label: '数据字典',
				path: 'data-dic',
				component: 'views/form/data-dic',
				icon: 'icon-caidan',
				children: []
			},
			{
				label: '数据类型',
				path: 'data-type',
				component: 'views/form/data-type',
				icon: 'icon-caidan',
				children: []
			},
			{
				label: '数据过滤',
				path: 'data-filter',
				component: 'views/form/data-filter',
				icon: 'icon-caidan',
				children: []
			},

			{
				label: '分组展示',
				path: 'group',
				component: 'views/form/group',
				icon: 'icon-caidan',
				children: []
			},
			{
				label: '选项卡展示',
				path: 'tabs',
				component: 'views/form/tabs',
				icon: 'icon-caidan',
				children: []
			},
			{
				label: '控制其它字段',
				path: 'control',
				component: 'views/form/control',
				icon: 'icon-caidan',
				children: []
			}
		]
	},
	{
		parentId: 1,
		label: 'CRUD表格',
		path: '/crud',
		icon: 'icon-caidan',
		children: [
			{
				label: 'CRUD基础',
				path: 'basics',
				component: 'views/crud/basics',
				iconBgColor: randomColor(),
				icon: 'icon-caidan',
				children: []
			}
		]
	},
	{
		parentId: 1,
		label: '批量导入',
		path: '/import-excel',
		component: 'views/util/import-dialog',
		icon: 'icon-caidan',
		children: []
	}
];
let menu = [first, second];
export default [
	{
		url: '/user/getMenu',
		method: 'get',
		response: ({ query }: Record<'query', Record<'type', string | number>>) => {
			return {
				data: menu[query.type || 0] || []
			};
		}
	},
	{
		url: '/user/getTopMenu',
		method: 'get',
		response: () => {
			return {
				data: top
			};
		}
	}
];
