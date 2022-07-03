import { DataPage } from '@/typings/axios';
import axios from 'http/axios';
export const list = (data: unknown) => {
	return axios.request<DataPage<{ name: string; sex: string }>>({
		url: '/crud/list',
		method: 'get',
		meta: {
			isSerialize: true
		},
		params: data
	});
};
export const del = (id: string) =>
	axios.delete('/crud', {
		params: {
			id
		}
	});
export const add = (data: unknown) =>
	axios.request({
		url: '/crud',
		method: 'post',
		meta: {
			isSerialize: true
		},
		data: data
	});
export const update = (data: unknown) =>
	axios.request({
		url: '/crud',
		method: 'put',
		meta: {
			isSerialize: true
		},
		data: data
	});
