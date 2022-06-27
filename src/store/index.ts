import { defineStore, createPinia } from 'pinia';
import piniaPersisted, { PersistedStateOptions } from 'pinia-plugin-persistedstate';

interface AuthState {
	accessToken: string;
	refreshToken: string;
	userId: string;
}

// pinia持久化参数配置
export const piniaPersistConfig = (key: string) => {
	const persist: PersistedStateOptions = {
		key,
		storage: window.localStorage
	};
	return persist;
};

export const authStore = defineStore({
	id: 'AuthState',
	state: (): AuthState => ({
		accessToken: '',
		refreshToken: '',
		userId: ''
	}),
	getters: {
		getToken: state => state.accessToken,
		getRefreshToken: state => state.refreshToken,
		getUserId: state => state.userId
	},
	actions: {
		logout() {
			this.accessToken = '';
			this.refreshToken = '';
			this.userId = '';
		},
		setToken(token: string) {
			this.accessToken = token;
		},
		setUserId(userId: string) {
			this.userId = userId;
		},
		setRefreshToken(refreshToken: string) {
			this.refreshToken = refreshToken;
		}
	},
	persist: piniaPersistConfig('AuthState')
});

const pinia = createPinia();
pinia.use(piniaPersisted);

export default pinia;
