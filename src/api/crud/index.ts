import axios from 'http/axios';
import { baseUrl } from '@/config/env';
export const list = (data: any) => {
	return axios.request({
		url: '/crud/list',
		method: 'get',
		meta: {
			isSerialize: true
		},
		params: data
	});
};
export const del = (id: string) =>
	axios.delete(baseUrl + '/crud', {
		params: {
			id
		}
	});
export const add = (data: any) =>
	axios.request({
		url: '/crud',
		method: 'post',
		meta: {
			isSerialize: true
		},
		data: data
	});
export const update = (data: any) =>
	axios.request({
		url: '/crud',
		method: 'put',
		meta: {
			isSerialize: true
		},
		data: data
	});
