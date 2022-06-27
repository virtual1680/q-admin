import { defineStore } from 'pinia';
import { PersistedStateOptions } from 'pinia-plugin-persistedstate';

interface UserStore {
	userInfo: any;
	permission: any;
	roles: any[];
	menuId: any;
	menu: any[];
	menuAll: any[];
	token: string;
}

// pinia持久化参数配置
export const piniaPersistConfig = (key: string) => {
	const persist: PersistedStateOptions = {
		key,
		storage: window.localStorage
	};
	return persist;
};

export const userStore = defineStore({
	id: 'UserStore',
	state: (): UserStore => ({
		userInfo: {},
		permission: {},
		roles: [],
		menuId: {},
		menu: [],
		menuAll: [],
		token: ''
	}),
	getters: {
		userInfo: state => state.userInfo,
		token: state => state.token,
		roles: state => state.roles,
		permission: state => state.permission,
		menuId: state => state.menuId,
		menu: state => state.menu,
		menuAll: state => state.menuAll
	},
	actions: {
		SET_TOKEN(token: string) {
			this.token = token;
		},
		SET_MENUID(menuId: string) {
			this.menuId = menuId;
		},
		SET_USERIFNO(userInfo: any) {
			this.userInfo = userInfo;
		},
		SET_MENUALL(menuAll: any[]) {
			let menu = this.menuAll;
			menuAll.forEach(ele => {
				let index = menu.findIndex(item => item.path == ele.path);
				if (index == -1) {
					menu.push(ele);
				} else {
					menu[index] = ele;
				}
			});
			this.menuAll = menu;
		},
		SET_MENUALL_NULL() {
			this.menuAll = [];
		},
		SET_MENU(menu: any) {
			this.menu = menu;
		},
		SET_ROLES(roles: any) {
			this.roles = roles;
		},
		SET_PERMISSION(permission: any[]) {
			this.permission = {};
			permission.forEach(ele => {
				this.permission[ele] = true;
			});
		}
	},
	persist: piniaPersistConfig('UserStore')
});
