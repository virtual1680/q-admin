import md5 from 'js-md5';
// import { validatenull } from './validate';
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';
// * 加密
export const encryptionPassword = function (userName: string, password: string) {
	let userNmaeLength = userName.length;
	let va = (userNmaeLength % 3) + 1;
	let type = userNmaeLength;
	let encryptionPassword = md5(password);
	if (userNmaeLength > encryptionPassword.length) {
		type = Math.floor(encryptionPassword.length / 2);
	}
	let sb = encryptionPassword.substring(0, type);
	for (let i = 0; i < va; i++) {
		sb = sb + i;
	}
	sb = sb + encryptionPassword.substring(type, encryptionPassword.length);
	return Base64.encode(sb);
};

//表单序列化
export const serialize = (data: any) => {
	let list: any[] = [];
	Object.keys(data).forEach(ele => {
		list.push(`${ele}=${data[ele]}`);
	});
	return list.join('&');
};
export const getObjType = (obj: any) => {
	let toString = Object.prototype.toString;
	let map = {
		'[object Boolean]': 'boolean',
		'[object Number]': 'number',
		'[object String]': 'string',
		'[object Function]': 'function',
		'[object Array]': 'array',
		'[object Date]': 'date',
		'[object RegExp]': 'regExp',
		'[object Undefined]': 'undefined',
		'[object Null]': 'null',
		'[object Object]': 'object'
	};
	if (obj instanceof Element) {
		return 'element';
	}
	return map[toString.call(obj)];
};
/**
 * 对象深拷贝
 */
export const deepClone = (data: any): any => {
	let type = getObjType(data);
	let obj;
	if (type === 'array') {
		obj = [];
	} else if (type === 'object') {
		obj = {};
	} else {
		//不再具有下一层次
		return data;
	}
	if (type === 'array') {
		for (let i = 0, len = (data as []).length; i < len; i++) {
			(obj as any[]).push(deepClone(data[i]));
		}
	} else if (type === 'object') {
		for (let key in data) {
			obj[key] = deepClone(data[key]);
		}
	}
	return obj;
};
/**
 * 设置灰度模式
 */
export const toggleGrayMode = (status: any) => {
	if (status) {
		document.body.className = document.body.className + ' grayMode';
	} else {
		document.body.className = document.body.className.replace(' grayMode', '');
	}
};
/**
 * 设置主题
 */
export const setTheme = (name: string) => {
	document.body.className = name;
};

/**
 * 加密处理
 */
export const encryption = (params: any) => {
	let { data = {}, type, param, key } = params;
	let result = JSON.parse(JSON.stringify(data));
	if (type == 'Base64') {
		param.forEach((ele: any) => {
			result[ele] = Base64.stringify(result[ele]);
		});
	} else if (type == 'Aes') {
		param.forEach((ele: any) => {
			result[ele] = sha256(result[ele], key);
		});
	}
	return result;
};

/**
 * 浏览器判断是否全屏
 */
export const fullscreenToggel = () => {
	if (fullscreenEnable()) {
		exitFullScreen();
	} else {
		reqFullScreen();
	}
};
/**
 * esc监听全屏
 */
export const listenfullscreen = (callback: () => void) => {
	function listen() {
		callback();
	}
	document.addEventListener('fullscreenchange', function () {
		listen();
	});
	document.addEventListener('mozfullscreenchange', function () {
		listen();
	});
	document.addEventListener('webkitfullscreenchange', function () {
		listen();
	});
	document.addEventListener('msfullscreenchange', function () {
		listen();
	});
};
/**
 * 浏览器判断是否全屏
 */
type ADocument = Document & {
	isFullScreen: boolean;
	mozIsFullScreen: boolean;
	webkitIsFullScreen: boolean;
	exitFullScreen: any;
	webkitCancelFullScreen: any;
	mozCancelFullScreen: any;
};
export const fullscreenEnable = () => {
	const docum = document as ADocument;
	let isFullscreen = docum.isFullScreen || docum.mozIsFullScreen || docum.webkitIsFullScreen;
	return isFullscreen;
};

/**
 * 浏览器全屏
 * requestFullscreen(options?: FullscreenOptions): Promise<void>;
 */
type AHTMLElement = HTMLElement & { requestFullScreen: any; webkitRequestFullScreen: any; mozRequestFullScreen: any };
export const reqFullScreen = () => {
	let documentElement = document.documentElement as AHTMLElement;
	if (documentElement.requestFullScreen) {
		documentElement.requestFullScreen();
	} else if (documentElement.webkitRequestFullScreen) {
		documentElement.webkitRequestFullScreen();
	} else if (documentElement.mozRequestFullScreen) {
		documentElement.mozRequestFullScreen();
	}
};
/**
 * 浏览器退出全屏
 */

export const exitFullScreen = () => {
	const docum = document as ADocument;
	let documentElement = document.documentElement as AHTMLElement;
	if (documentElement.requestFullScreen) {
		docum.exitFullScreen();
	} else if (documentElement.webkitRequestFullScreen) {
		docum.webkitCancelFullScreen();
	} else if (documentElement.mozRequestFullScreen) {
		docum.mozCancelFullScreen();
	}
};
/**
 * 递归寻找子类的父类
 */

export const findParent = (menu: RouterMenu[], id: string): RouterMenu | undefined => {
	for (let i = 0; i < menu.length; i++) {
		if (menu[i].children.length != 0) {
			for (let j = 0; j < menu[i].children.length; j++) {
				if (menu[i].children[j].id == id) {
					return menu[i];
				} else {
					if (menu[i].children[j].children.length != 0) {
						return findParent(menu[i].children[j].children, id);
					}
				}
			}
		}
	}
};
/**
 * 判断2个对象属性和值是否相等
 */

/**
 * 动态插入css
 */

export const loadStyle = (url: string) => {
	const link = document.createElement('link');
	link.type = 'text/css';
	link.rel = 'stylesheet';
	link.href = url;
	const head = document.getElementsByTagName('head')[0];
	head.appendChild(link);
};
/**
 * 判断路由是否相等
 */
export const diff = (obj1: any, obj2: any): boolean => {
	delete obj1.close;
	let o1 = obj1 instanceof Object;
	let o2 = obj2 instanceof Object;
	if (!o1 || !o2) {
		/*  判断不是对象  */
		return obj1 === obj2;
	}

	if (Object.keys(obj1).length !== Object.keys(obj2).length) {
		return false;
		//Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
	}

	for (let attr in obj1) {
		let t1 = obj1[attr] instanceof Object;
		let t2 = obj2[attr] instanceof Object;
		if (t1 && t2) {
			return diff(obj1[attr], obj2[attr]);
		} else if (obj1[attr] !== obj2[attr]) {
			return false;
		}
	}
	return true;
};
/**
 * 根据字典的value显示label
 */
export const findByvalue = (dic: { label: any }[], value: string | any[]) => {
	let result: string | any[] = '';
	// if (validatenull(dic)) return value;
	if (typeof value == 'string' || typeof value == 'number' || typeof value == 'boolean') {
		let index = 0;
		index = findArray(dic, value);
		if (index != -1) {
			result = dic[index].label;
		} else {
			result = value;
		}
	} else if (value instanceof Array) {
		result = [];
		let index = 0;
		value.forEach(ele => {
			index = findArray(dic, ele);
			if (index != -1) {
				(result as any[]).push(dic[index].label);
			} else {
				(result as any[]).push(value);
			}
		});
		result = result.toString();
	}
	return result;
};
/**
 * 根据字典的value查找对应的index
 */
export const findArray = (dic: any[], value: any) => {
	for (let i = 0; i < dic.length; i++) {
		if (dic[i].value == value) {
			return i;
		}
	}
	return -1;
};
/**
 * 生成随机len位数字
 */
export const randomLenNum = (len: number, date: any) => {
	let random = '';
	random = Math.ceil(Math.random() * 100000000000000)
		.toString()
		.substr(0, len ? len : 4);
	if (date) random = random + Date.now();
	return random;
};
/**
 * 打开小窗口
 */
export const openWindow = (url: string, title: string, w: number, h: number) => {
	// Fixes dual-screen position                            Most browsers       Firefox
	const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen['left'];
	const dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen['top'];

	const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
	const height = window.innerHeight
		? window.innerHeight
		: document.documentElement.clientHeight
		? document.documentElement.clientHeight
		: screen.height;

	const left = width / 2 - w / 2 + dualScreenLeft;
	const top = height / 2 - h / 2 + dualScreenTop;
	const newWindow = window.open(
		url,
		title,
		'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=' +
			w +
			', height=' +
			h +
			', top=' +
			top +
			', left=' +
			left
	);

	// Puts focus on the newWindow
	//TODO window.focus &&
	newWindow?.focus();
};

export const getScreen = (isCollapse: boolean) => {
	if (document.body.clientWidth <= 768) {
		return !isCollapse;
	} else {
		return isCollapse;
	}
};
