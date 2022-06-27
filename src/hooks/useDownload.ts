import { ElNotification } from 'element-plus';
import { rest } from 'lodash';

type Nav = Navigator & {
	msSaveOrOpenBlob: (blob: Blob, fileName: string) => void;
	browserLanguage: string;
};
/**
 * @description 接收数据流生成blob，创建链接，下载文件
 * @param api 导出表格的api地址(必传)
 * @param isNotify 是否有导出消息提示(默认为 true)
 * */
export const useDownload = async (api: (params: any) => Promise<any>, isNotify: boolean = false) => {
	if (isNotify) {
		ElNotification({
			title: '温馨提示',
			message: '如果数据庞大会导致下载缓慢哦，请您耐心等待！',
			type: 'info',
			duration: 3000
		});
	}
	try {
		const res = await api.call(this, rest);
		let blob = new Blob([res.data], { type: 'application/octet-stream;charset=utf-8;' });
		let filename = res.headers['content-disposition'].split(';')[1];
		// 兼容edge不支持createObjectURL方法
		if ('msSaveOrOpenBlob' in navigator) return (window.navigator as Nav).msSaveOrOpenBlob(blob, filename);

		let fileUrl = URL.createObjectURL(blob);
		let a = document.createElement('a');
		document.body.appendChild(a);
		a.style.display = 'none';
		a.href = fileUrl;
		a.download = filename;
		a.click();
		document.body.removeChild(a);
		window.URL.revokeObjectURL(fileUrl);
	} catch (error) {
		console.log(error);
	}
};
