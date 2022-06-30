import { validatenull } from 'utils/validate';
import website from '@/config/website';

const keyName = website.key + '-';
/**
 * 存储 localStorage or sessionStorage
 */
interface _BaseStorage {
	readonly datetime: number;
	readonly dataType: string;
}
export interface StorageParams {
	name: string;
	content: string | number | symbol | boolean | unknown[];
	type?: 'local' | 'session';
	debug?: boolean;
}

export const setStore = (params: Pick<StorageParams, 'name' | 'content' | 'type'>) => {
	let { name, content, type } = params;
	name = keyName + name;
	let obj = {
		dataType: typeof content,
		content: content,
		type: type || 'local',
		datetime: new Date().getTime()
	};
	window[`${type || 'local'}Storage`].setItem(name, JSON.stringify(obj));
};
/**
 * 获取 Storage
 */
type ResultData = StorageParams & _BaseStorage;
export const getStore = (params: Pick<StorageParams, 'name' | 'debug' | 'type'>): ResultData | null => {
	let { name, debug, type } = params;
	name = keyName + name;
	let obj: ResultData, strJson: string | null, content;
	strJson = window[`${type || 'local'}Storage`].getItem(name);
	if (validatenull(strJson)) return null;
	try {
		obj = JSON.parse(strJson!);
	} catch {
		`${name} getItem error`;
		return null;
	}
	if (debug) {
		return obj;
	}
	if (obj.dataType == 'string') {
		content = obj.content;
	} else if (obj.dataType == 'number') {
		content = Number(obj.content);
	} else if (obj.dataType == 'boolean') {
		content = eval(obj.content as string);
	} else if (obj.dataType == 'object') {
		content = obj.content;
	}
	return content;
};
/**
 * 删除 Storage
 */
export const removeStore = (params: Pick<StorageParams, 'name' | 'type'>) => {
	let { name, type } = params;
	name = keyName + name;
	window[`${type || 'local'}Storage`].removeItem(name);
};

/**
 * 获取全部 Storage
 */
export const getAllStore = (params: Pick<StorageParams, 'type'>) => {
	let list = [];
	let { type } = params;
	if (type === 'session') {
		for (let i = 0; i <= window.sessionStorage.length; i++) {
			list.push({
				name: window.sessionStorage.key(i),
				content: getStore({
					name: window.sessionStorage.key(i)!,
					type: 'session'
				})
			});
		}
	} else {
		for (let i = 0; i <= window.localStorage.length; i++) {
			list.push({
				name: window.localStorage.key(i),
				content: getStore({
					name: window.localStorage.key(i)!
				})
			});
		}
	}
	return list;
};

/**
 * 清空全部 Storage
 */
export const clearStore = (params: Pick<StorageParams, 'type'>) => {
	let { type } = params;
	window[`${type || 'local'}Storage`].clear();
};
