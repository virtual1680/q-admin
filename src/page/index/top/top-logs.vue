<template>
	<span @click="logsFlag ? '' : handleOpen()">
		<el-badge :value="logsFlag ? '' : logsLen" :max="99">
			<i class="icon-rizhi1"></i>
		</el-badge>
		<el-dialog title="日志" v-model="box" width="60%" append-to-body>
			<el-button type="primary" icon="el-icon-upload" @click="send">上传服务器</el-button>
			<el-button type="danger" icon="el-icon-delete" @click="clear">清空本地日志</el-button>
			<el-table :data="logsList">
				<el-table-column prop="type" label="类型" width="50px"> </el-table-column>
				<el-table-column prop="url" label="地址" show-overflow-tooltip width="180"> </el-table-column>
				<el-table-column prop="message" show-overflow-tooltip label="内容"> </el-table-column>
				<el-table-column prop="stack" show-overflow-tooltip label="错误堆栈"> </el-table-column>
				<el-table-column prop="time" label="时间"> </el-table-column>
			</el-table>
		</el-dialog>
	</span>
</template>

<script lang="ts" setup name="top-logs">
import { computed, ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useLogsStore } from 'store/logs';

const logsStore = useLogsStore();
const box = ref(false);

const handleOpen = () => {
	box.value = true;
};
const logsList = computed(() => {
	return logsStore.getLogsList;
});
const logsFlag = computed(() => {
	return logsStore.getLogsFlag;
});
const logsLen = computed(() => {
	return logsStore.getLogsLen;
});
const send = () => {
	ElMessageBox.confirm('确定上传本地日志到服务器?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning'
	})
		.then(() => {
			logsStore.SendLogs().then(() => {
				box.value = false;
				ElMessage.success({
					type: 'success',
					message: '发送成功!'
				});
			});
		})
		.catch(() => {});
};
const clear = () => {
	ElMessageBox.confirm('确定清空本地日志记录?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning'
	})
		.then(() => {
			logsStore.CLEAR_LOGS();
			box.value = false;
			ElMessage.success({
				type: 'success',
				message: '清空成功!'
			});
		})
		.catch(() => {});
};
</script>

<style lang="scss" scoped>
.code {
	font-size: 12px;
	display: block;
	font-family: monospace;
	white-space: pre;
	margin: 1em 0px;
}
</style>
