import axios, { AxiosRequestConfig, Canceler } from "axios";
import qs from "qs";
// * 1.取消重复请求 2.在某个阶段取消所有请求

let pendingMap = new Map<string, Canceler>();
export const getPendingUrl = (config: AxiosRequestConfig) =>
	[config.method, config.url, qs.stringify(config.data), qs.stringify(config.params)].join("&");

export class AxiosCanceler {
	/**
	 * @description: 添加请求
	 * @param {Object} config
	 */
	addPending(config: AxiosRequestConfig) {
		//检测是否有同一请求在执行中,有则移除
		this.removePending(config);
		const url = getPendingUrl(config);
		config.cancelToken =
			config.cancelToken ||
			new axios.CancelToken(cancel => {
				if (!pendingMap.has(url)) {
					// 如果 pending 中不存在当前请求，则添加进去
					pendingMap.set(url, cancel);
				}
			});
	}

	/**
	 * @description: 移除请求
	 * @param {Object} config
	 */
	removePending(config: AxiosRequestConfig) {
		const url = getPendingUrl(config);
		if (pendingMap.has(url)) {
			// 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
			const cancel = pendingMap.get(url);
			cancel && cancel();
			pendingMap.delete(url);
		}
	}
	// * 清空所有pending
	removeAllPending() {
		pendingMap.forEach(cancel => {
			cancel && cancel();
		});
		pendingMap.clear();
	}

	// * 重置
	reset(): void {
		pendingMap = new Map<string, Canceler>();
	}
}
