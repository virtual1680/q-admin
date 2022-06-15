import { defineStore, createPinia } from "pinia";
import piniaPersisted, { PersistedStateOptions } from "pinia-plugin-persistedstate";

interface AuthState {
	accessToken: string;
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

export const useStore = defineStore({
	id: "AuthState",
	state: (): AuthState => ({
		accessToken: "",
		refreshToken: ""
	}),
	getters: {
		getToken: state => state.accessToken,
		getRefreshToken: state => state.refreshToken
	},
	actions: {
		setToken(token: string) {
			this.accessToken = token;
		},
		setRefreshToken(refreshToken: string) {
			this.refreshToken = refreshToken;
		}
	},
	persist: piniaPersistConfig("AuthState")
});

const pinia = createPinia();
pinia.use(piniaPersisted);

export default pinia;
