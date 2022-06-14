import axios, {
	AxiosInstance,
	AxiosError,
	AxiosRequestConfig,
	AxiosResponse,
	AxiosRequestHeaders,
} from 'axios';
import { ElMessage } from 'element-plus';
import { getToken } from 'utils/token';
import router from 'app/router/index';
import { removeToken, removeRefreshToken } from 'utils/token';
const instance: AxiosInstance = axios.create({
	baseURL: '/api/',
	timeout: 15000, // 请求超时时间
	withCredentials: true,
	validateStatus: (status: number) => {
		return status >= 200 && status <= 500;
	},
});
//锁标识
let lock = 0;
// 错误处理
const error = (error: AxiosError) => {
	if (error.message.includes('timeout')) {
		ElMessage.error('请求超时，请刷新网页重试');
	}
	if (error.response) {
		const data = error.response.data;
		if (error.response.status === 403) {
			ElMessage.error('拒绝访问');
		} else if (error.response.status === 401) {
			ElMessage.error('未登录');
		} else {
			ElMessage.error(error.message);
		}
	}
	return Promise.reject(error);
};

type Config = AxiosRequestConfig & {
	successNotice?: boolean;
	errorNotice?: boolean;
	meta?: { isToken: boolean };
	text?: boolean;
};

instance.interceptors.request.use<Config>((config: Config) => {
	const meta = config.meta;
	const isToken = meta?.isToken === false;
	(config.headers as AxiosRequestHeaders)['Authorization'] = `Basic c2FiZXI6c2FiZXJfc2VjcmV0`;
	//让每个请求携带token
	if (getToken() && !isToken) {
		(config.headers as AxiosRequestHeaders)['Blade-Auth'] = 'bearer ' + getToken();
	}
	//headers中配置text请求
	if (config.text === true) {
		(config.headers as AxiosRequestHeaders)['Content-Type'] = 'text/plain';
	} else {
		(config.headers as AxiosRequestHeaders)['Content-Type'] = 'application/json;charset=UTF-8';
	}

	return config;
}, error);

instance.interceptors.response.use((response: AxiosResponse) => {
	const config: Config = response.config;
	//获取状态码
	const status = response.data.code || response.status;
	const message = response.data.msg || response.data.error_description || '未知错误';
	if (status === 401) {
		if (lock === 1) return false;
		//只执行一次
		lock === 0 && ElMessage.error(message);
		lock = 1;
		removeToken();
		removeRefreshToken();
		router.push('/login');
		return Promise.reject(new Error(message));
	} else if (status !== 200) {
		ElMessage.error(message);
		return Promise.reject(new Error(message));
	} else {
		lock = 0;
	}
	if (config && config.successNotice) {
		ElMessage.success(response.data.msg);
	}
	const data = response.data;
	if (data.hasOwnProperty('error_code')) {
		ElMessage.error(message);
		return Promise.reject(new Error(message));
	}

	return response.data;
}, error);

export default instance;
