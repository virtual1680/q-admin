import axios from 'http/axios';
import { baseUrl } from '@/config/env';
export const loginByUsername = (username: string, password: string, code: string, redomStr: string) =>
	axios.request({
		url: baseUrl + '/user/login',
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
		url: baseUrl + '/user/getUserInfo',
		method: 'get'
	});

export const refeshToken = () =>
	axios.request({
		url: baseUrl + '/user/refresh',
		method: 'post'
	});

export const getMenu = (type: string | number = 0) =>
	axios.request({
		url: baseUrl + '/user/getMenu',
		method: 'get',
		params: {
			type
		}
	});

export const getTopMenu = () =>
	axios.request({
		url: baseUrl + '/user/getTopMenu',
		method: 'get'
	});

export const sendLogs = (list: any) =>
	axios.request({
		url: baseUrl + '/user/logout',
		method: 'post',
		data: list
	});

export const logout = () =>
	axios.request({
		url: baseUrl + '/user/logout',
		meta: {
			isToken: false
		},
		method: 'get'
	});
