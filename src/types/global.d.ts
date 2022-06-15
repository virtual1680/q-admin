// * .env
declare type Recordable<T = any> = Record<string, T>;

declare interface ViteEnv {
	VITE_API_URL: string;
	VITE_PORT: number;
	VITE_OPEN: boolean;
	VITE_GLOB_APP_TITLE: string;
	VITE_DROP_CONSOLE: boolean;
	VITE_PROXY_URL: string;
	VITE_BUILD_GZIP: boolean;
	VITE_REPORT: boolean;
}

// * http
declare interface Result<T = any> {
	code: number;
	msg: string;
	data: T;
}

declare interface AxiosInstance {
	// request<T = any, R = Result<T>>(config: AxiosRequestConfig): Promise<R>;
	get<T = any, R = Result<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
	delete<T = any, R = Result<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
	head<T = any, R = Result<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
	options<T = any, R = Result<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
	post<T = any, R = Result<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
	put<T = any, R = Result<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
	patch<T = any, R = Result<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
}
