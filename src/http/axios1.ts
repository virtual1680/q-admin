import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ElMessage } from "element-plus";

const instance = axios.create({
	baseURL: "/api",
	timeout: 15000, // 请求超时时间
	withCredentials: true, // 跨域时候允许携带凭证
	validateStatus: (status: number) => {
		return status >= 200 && status <= 500;
	}
});
// 这里的拦截和 class 类封装的是一样的操作，这里我就不再写一次了
instance.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		//书写自己的逻辑
		return config;
	},
	(error: AxiosError) => {
		return Promise.reject(error);
	}
);
instance.interceptors.response.use(
	(response: AxiosResponse) => {
		const { data } = response;
		//书写自己的逻辑
		return data;
	},
	(error: AxiosError) => {
		ElMessage.error(error.message);
		return Promise.reject(error);
	}
);

export default instance;
