<template>
	<avue-dialog-form ref="dialogFormRef"></avue-dialog-form>
</template>
<script setup lang="ts" name="ImportExcel">
import { Ref, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { Download } from '@element-plus/icons-vue';
import { useDownload } from 'app/hooks/useDownload';
import axios from 'http/axios';
import { AxiosResponse } from 'axios';
interface ImportResult {
	done: () => void; //关闭等待
	close: () => void; // 关闭弹窗
	data: Record<string, unknown>;
}
interface ImportOption {
	downloadUrl: string; //模板下载接口
	limit: number; // 上传文件条数
	fileSize: number; // 单条文件大小 kb
	accept: string; //文件类型
	action: string; //上传地址
	commit: (res: ImportResult) => void;
}
type DialogForm = HTMLElement & { show: (option: Record<string, unknown>) => void };
const dialogFormRef: Ref<DialogForm | null> = ref(null);
const getOption = (ops: Partial<ImportOption>) => {
	const getExcel = () => {
		return axios.request<never, AxiosResponse<ArrayBuffer>>({
			url: ops.downloadUrl,
			responseType: 'arraybuffer',
			method: 'get',
			meta: {
				returnType: 'response'
			}
		});
	};
	return {
		submitText: '提交',
		span: 24,
		column: [
			{
				label: '模板下载',
				prop: 'name',
				component: 'el-button',
				params: { size: 'small', type: 'primary', icon: Download, html: '点击下载' },
				display: ops.downloadUrl ? true : false,
				event: {
					click: async () => {
						await useDownload(getExcel);
						console.log('点击事件');
					}
				}
			},
			{
				label: '文件上传',
				type: 'upload',
				prop: 'filePath',
				dragFile: true,
				loadText: '文件上传中，请稍等',
				limit: ops.limit || 1,
				accept: ops.accept || '.xls,.xlsx',
				fileSize: ops.fileSize || 1024,
				action: ops.action || '/imgupload',
				tip: '请上传 .xls , .xlsx 标准格式文件'
			}
		]
	};
};
const open = (ops: Partial<ImportOption>) => {
	dialogFormRef.value?.show({
		title: '批量导入',
		width: '500px',
		menuPosition: 'right',
		option: getOption(ops),
		beforeClose: (done: () => void) => {
			ElMessage.success('关闭前方法');
			done();
		},
		callback: (res: ImportResult) => {
			console.log(res.data);
			ops.commit?.(res);
		}
	});
};
defineExpose({ open });
</script>
