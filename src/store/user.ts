import { getMenu, getTopMenu, getUserInfo, loginByUsername, logout, refeshToken } from '@/api/user';
import { setStore } from '@/hooks/useStorage';
import { formatPath } from '@/router/avue-router';
import { deepClone, encryption } from '@/utils/util';
import { defineStore } from 'pinia';
import { PersistedStateOptions } from 'pinia-plugin-persistedstate';

interface UserStore {
	userInfo: any;
	permission: any;
	roles: any[];
	menuId: any;
	menu: RouterMenu[];
	menuAll: RouterMenu[];
	token: string;
	refreshToken: string;
}

// pinia持久化参数配置
export const piniaPersistConfig = (key: string) => {
	const persist: PersistedStateOptions = {
		key,
		storage: window.localStorage
	};
	return persist;
};

export const useUserStore = defineStore({
	id: 'UserStore',
	state: (): UserStore => ({
		userInfo: {},
		permission: {},
		roles: [],
		menuId: {},
		menu: [],
		menuAll: [],
		token: '',
		refreshToken: ''
	}),
	getters: {
		getUserInfo: state => state.userInfo,
		getToken: state => state.token,
		getRefreshToken: state => state.refreshToken,
		getRoles: state => state.roles,
		getPermission: state => state.permission,
		getMenuId: state => state.menuId,
		getMenu: state => state.menu,
		getMenuAll: state => state.menuAll
	},
	actions: {
		//根据用户名登录
		LoginByUsername(userInfo: Record<string, string>) {
			const user = encryption({
				data: userInfo,
				type: 'Aes',
				key: 'avue',
				param: ['useranme', 'password']
			});

			return new Promise((resolve: (value?: unknown) => void) => {
				loginByUsername(user.username, user.password, userInfo.code, userInfo.redomStr).then(res => {
					const data = res.data;
					this.SET_TOKEN(data);
					// this.DEL_ALL_TAG([]);
					// this.CLEAR_LOCK();
					resolve();
				});
			});
		},
		//根据手机号登录
		// LoginByPhone(userInfo) {
		// 	return new Promise((resolve: (value?: unknown) => void) => {
		// 		// loginByUsername(userInfo.phone, userInfo.code).then(res => {
		// 		// 	const data = res.data.data;
		// 		// 	commit('SET_TOKEN', data);
		// 		// 	// commit('DEL_ALL_TAG', []);
		// 		// 	// commit('CLEAR_LOCK');
		// 		// 	resolve();
		// 		// });
		// 	});
		// },
		GetUserInfo() {
			return new Promise((resolve, reject) => {
				getUserInfo()
					.then(res => {
						const data = res.data;
						this.SET_USERIFNO(data.userInfo);
						this.SET_ROLES(data.roles);
						this.SET_PERMISSION(data.permission);
						resolve(data);
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		//刷新token
		RefreshToken() {
			return new Promise((resolve, reject) => {
				// state.refeshToken
				refeshToken()
					.then(res => {
						const data = res.data;
						this.SET_TOKEN(data);
						resolve(data);
					})
					.catch(error => {
						reject(error);
					});
			});
		},
		// 登出
		LogOut() {
			return new Promise((resolve: (value?: unknown) => void, reject) => {
				logout()
					.then(() => {
						this.SET_TOKEN('');
						this.SET_MENUALL_NULL();
						this.SET_MENU([]);
						this.SET_ROLES([]);
						// commit('DEL_ALL_TAG', []);
						// commit('CLEAR_LOCK');
						// removeToken();
						resolve();
					})
					.catch(error => {
						reject(error);
					});
			});
		},
		//注销session
		FedLogOut() {
			return new Promise((resolve: (value?: unknown) => void) => {
				this.SET_TOKEN('');
				this.SET_MENUALL_NULL();
				this.SET_MENU([]);
				this.SET_ROLES([]);
				// commit('DEL_ALL_TAG', []);
				// commit('CLEAR_LOCK');
				// removeToken();
				resolve();
			});
		},
		GetTopMenu(): Promise<RouterMenu[]> {
			return new Promise((resolve: (value: RouterMenu[]) => void) => {
				getTopMenu().then(res => {
					const data = res.data || [];
					resolve(data);
				});
			});
		},
		//获取系统菜单
		GetMenu(parentId?: string): Promise<any[]> {
			return new Promise(resolve => {
				getMenu(parentId).then(res => {
					const data = res.data;
					let menu = deepClone(data);
					menu.forEach((ele: RouterMenu) => formatPath(ele, true));
					this.SET_MENUALL(menu);
					this.SET_MENU(menu);
					resolve(menu);
				});
			});
		},

		SET_TOKEN(token: string) {
			this.token = token;
			setStore({ name: 'token', content: token });
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
			setStore({ name: 'menuAll', content: this.menuAll });
		},
		SET_MENUALL_NULL() {
			this.menuAll = [];
		},
		SET_MENU(menu: any) {
			this.menu = menu;
			setStore({ name: 'menu', content: menu });
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
