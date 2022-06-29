import type { Axios, AxiosRequestConfig } from 'axios';

type Params = Partial<Record<string, unknown>>;
type Config = Omit<AxiosRequestConfig, 'url' | 'method'>;
type RequestConfig = AxiosRequestConfig & { meta?: { isToken?: boolean; isSerialize?: boolean } };
declare module 'axios' {
	declare interface AxiosInstance extends Axios {
		request<T = any, R = Result<T>>(config: RequestConfig): Promise<R>;
		get<T = any, R = Result<T>>(url: string, params?: Params, config?: Config): Promise<R>;
		post<T = any, R = Result<T>>(url: string, params?: Params, config?: Config): Promise<R>;
		put<T = any, R = Result<T>>(url: string, params?: Params, config?: Config): Promise<R>;
		delete<T = any, R = Result<T>>(url: string, params?: Params, config?: Config): Promise<R>;
		head<T = any, R = Result<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
		options<T = any, R = Result<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
		patch<T = any, R = Result<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
	}
}
