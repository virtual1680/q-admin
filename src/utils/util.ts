import md5 from 'js-md5';
import { Base64 } from 'js-base64';

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
