import type { Axios } from 'axios';

declare module 'axios' {
	declare interface AxiosInstance extends Axios {
		request<T = any, R = Result<T>>(config: AxiosRequestConfig): Promise<R>;
		get<T = any, R = Result<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
		delete<T = any, R = Result<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
		head<T = any, R = Result<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
		options<T = any, R = Result<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
		post<T = any, R = Result<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
		put<T = any, R = Result<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
		patch<T = any, R = Result<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
	}
}
