import axios from 'http/axios';

export const loginByUsername = (username: string, password: string, code: string, redomStr: string) =>
	axios.request({
		url: 'user/login',
		method: 'post',
		meta: {
			isToken: false
		},
		data: {
			username,
			password,
			code,
			redomStr
		}
	});

export const getUserInfo = () =>
	axios.request({
		url: 'user/getUserInfo',
		method: 'get'
	});

export const refeshToken = () =>
	axios.request({
		url: '/user/refresh',
		method: 'post'
	});

export const getMenu = (type: string | number = 0) =>
	axios.request<RouterMenu[]>({
		url: 'user/getMenu',
		method: 'get',
		params: {
			type
		}
	});

export const getTopMenu = () =>
	axios.request({
		url: 'user/getTopMenu',
		method: 'get'
	});

export const sendLogs = (list: unknown) =>
	axios.request({
		url: '/user/logout',
		method: 'post',
		data: list
	});

export const logout = () =>
	axios.request({
		url: '/user/logout',
		meta: {
			isToken: false
		},
		method: 'get'
	});
