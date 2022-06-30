import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, AxiosRequestHeaders } from 'axios';
import { ElMessage } from 'element-plus';
import { getToken } from 'utils/token';
import router from 'router/index';
import { AxiosCanceler } from './cancel';
import { ResultEnum } from 'app/enums/http';
import { useUserStore } from 'store/index';
const axiosCanceler = new AxiosCanceler();
// import { baseUrl } from '@/config/env';
const config = {
	baseURL: '/',
	timeout: ResultEnum.TIMEOUT as number, // 请求超时时间
	withCredentials: true, // 跨域时候允许携带凭证
	validateStatus: (status: number) => {
		return status >= 200 && status <= 500;
	}
};
type RequestConfig = AxiosRequestConfig & { meta?: { isToken?: boolean; isSerialize?: boolean } };
let lock: number = 0;
const instance = axios.create(config);
instance.interceptors.request.use(
	(config: RequestConfig) => {
		const headers = config.headers;
		//添加请求
		axiosCanceler.addPending(config);
		(config.headers as AxiosRequestHeaders)['Authorization'] = `Basic c2FiZXI6c2FiZXJfc2VjcmV0`;
		if (getToken() && !headers?.isToken) {
			(config.headers as AxiosRequestHeaders)['Blade-Auth'] = 'bearer ' + getToken();
		}
		(config.headers as AxiosRequestHeaders)['Content-Type'] = 'application/json;charset=UTF-8';

		return config;
	},
	(error: AxiosError) => {
		return Promise.reject(error);
	}
);
instance.interceptors.response.use(
	(response: AxiosResponse) => {
		const { config, status: code, data } = response;
		//移除已执行完的请求（也就是当前请求）
		axiosCanceler.removePending(config);
		const status = data.code || code;
		const message = data.msg || data.error_description || '未知错误';
		if (status === 401) {
			if (lock === 1) return false;
			lock === 0 && ElMessage.error(message);
			lock = 1;
			const userStore = useUserStore();
			userStore.LogOut();
			router.replace({ path: '/login' });
			return Promise.reject(data);
		} else if (status !== ResultEnum.SUCCESS) {
			ElMessage.error(message);
			return Promise.reject(data);
		}
		lock = 0;
		if (config.headers?.notice) {
			ElMessage.success(message);
		}
		if (data.hasOwnProperty('error_code')) {
			ElMessage.error(message);
			return Promise.reject(data);
		}
		return data;
	},
	(error: AxiosError) => {
		console.log(error);
		// if (error.message.includes("timeout")) {
		// 	ElMessage.error("请求超时，请刷新网页重试");
		// } else if (error.response) {
		// 	if (error.response.status === 403) {
		// 		ElMessage.error("拒绝访问");
		// 	} else if (error.response.status === 401) {
		// 		ElMessage.error("未登录");
		// 	} else {
		// 		ElMessage.error(error.message);
		// 	}
		// }
		ElMessage.error(error.message);
		return Promise.reject(error);
	}
);

export default instance;
