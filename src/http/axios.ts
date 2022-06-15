import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse, AxiosRequestHeaders } from "axios";
import { ElMessage } from "element-plus";
import { getToken } from "utils/token";
import router from "router/index";
import { AxiosCanceler } from "./cancel";
import { ResultEnum } from "app/enums/http";
import { authStore } from "app/store";
const axiosCanceler = new AxiosCanceler();
const authState = authStore();
const config = {
	baseURL: import.meta.env.VITE_API_URL as string,
	timeout: ResultEnum.TIMEOUT as number, // 请求超时时间
	withCredentials: true, // 跨域时候允许携带凭证
	validateStatus: (status: number) => {
		return status >= 200 && status <= 500;
	}
};
type Params = Partial<Record<string, unknown>>;
class Axios {
	//axios 实列
	private instance: AxiosInstance;
	//锁
	private lock: number = 0;
	constructor(config: AxiosRequestConfig) {
		this.instance = axios.create(config);
		this.interceptorsRequest();
		this.interceptorsResponse();
	}
	// * 请求拦截
	protected interceptorsRequest() {
		this.instance.interceptors.request.use(
			(config: AxiosRequestConfig) => {
				const headers = config.headers;
				//添加请求
				axiosCanceler.addPending(config);
				(config.headers as AxiosRequestHeaders)["Authorization"] = `Basic c2FiZXI6c2FiZXJfc2VjcmV0`;
				if (getToken() && !headers?.isToken) {
					(config.headers as AxiosRequestHeaders)["Blade-Auth"] = "bearer " + getToken();
				}
				return config;
			},
			(error: AxiosError) => {
				return Promise.reject(error);
			}
		);
	}
	// * 响应拦截
	protected interceptorsResponse() {
		this.instance.interceptors.response.use(
			(response: AxiosResponse) => {
				const { config, status: code, data } = response;
				//移除已执行完的请求（也就是当前请求）
				axiosCanceler.removePending(config);
				const status = data.code || code;
				const message = data.msg || data.error_description || "未知错误";
				if (status === 401) {
					if (this.lock === 1) return false;
					this.lock === 0 && ElMessage.error(message);
					this.lock = 1;
					authState.logout();
					router.replace({ path: "/login" });
					return Promise.reject(data);
				} else if (status !== ResultEnum.SUCCESS) {
					ElMessage.error(message);
					return Promise.reject(data);
				}
				this.lock = 0;
				if (config.headers?.notice) {
					ElMessage.success(message);
				}
				if (data.hasOwnProperty("error_code")) {
					ElMessage.error(message);
					return Promise.reject(data);
				}
				return data;
			},
			(error: AxiosError) => {
				if (error.message.includes("timeout")) {
					ElMessage.error("请求超时，请刷新网页重试");
				} else if (error.response) {
					if (error.response.status === 403) {
						ElMessage.error("拒绝访问");
					} else if (error.response.status === 401) {
						ElMessage.error("未登录");
					} else {
						ElMessage.error(error.message);
					}
				}
				return Promise.reject(error);
			}
		);
	}

	// * 请求方法
	get<T, R = T>(url: string, params?: Params, config = {}): Promise<R extends T ? Result<T> : R> {
		return this.instance.get(url, { params, ...config });
	}
	post<T>(url: string, params?: Params, config = {}): Promise<Result<T>> {
		return this.instance.post(url, params, config);
	}
	put<T>(url: string, params?: Params, config = {}): Promise<Result<T>> {
		return this.instance.put(url, params, config);
	}
	delete<T>(url: string, params?: Params, config = {}): Promise<Result<T>> {
		return this.instance.delete(url, { params, ...config });
	}
}

export default new Axios(config);
