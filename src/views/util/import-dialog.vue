<template>
	<basic-container>
		<h3>点击批量导入,弹出模板下单文件上传</h3>
		<el-tag @click="open">批量导入</el-tag>
		<br />
		<br />
		<div style="height: 500px"></div>
		<ImportExcel ref="importExcelRef" />
	</basic-container>
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue';
import ImportExcel from 'components/import-excel/index.vue';
import { ElMessage } from 'element-plus';
const importExcelRef: Ref<InstanceType<typeof ImportExcel> | null> = ref(null);
const open = () => {
	importExcelRef.value?.open({
		downloadUrl: 'crud/list',
		commit: res => {
			console.log(res.data);
			ElMessage.success('关闭等待框');
			setTimeout(() => {
				res.done();
				setTimeout(() => {
					ElMessage.success('关闭弹窗');
					res.close();
				}, 1000);
			}, 1000);
		}
	});
};
</script>
