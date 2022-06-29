import dayjs from 'dayjs';
import { defineStore } from 'pinia';
import { PersistedStateOptions } from 'pinia-plugin-persistedstate';
import { sendLogs } from '@/api/user';
interface LogsStore {
	logsList: any[];
}

// pinia持久化参数配置
export const piniaPersistConfig = (key: string) => {
	const persist: PersistedStateOptions = {
		key,
		storage: window.localStorage
	};
	return persist;
};

export const useLogsStore = defineStore({
	id: 'LogsStore',
	state: (): LogsStore => ({ logsList: [] }),
	getters: {
		getLogsList: state => state.logsList,
		getLogsLen: state => state.logsList.length || 0,
		getLogsFlag: state => state.logsList.length === 0
	},
	actions: {
		SendLogs() {
			return new Promise((resolve: (value?: unknown) => void, reject) => {
				sendLogs(this.getLogsList)
					.then(() => {
						this.CLEAR_LOGS();
						resolve();
					})
					.catch(error => {
						reject(error);
					});
			});
		},
		ADD_LOGS({ type, message, stack, info }: any) {
			this.logsList.push(
				Object.assign(
					{
						url: window.location.href,
						time: dayjs().format('YYYY-MM-DD HH:mm:ss')
					},
					{
						type,
						message,
						stack,
						info: info.toString()
					}
				)
			);
		},
		CLEAR_LOGS() {
			this.logsList = [];
		}
	},
	persist: piniaPersistConfig('LogsStore')
});
