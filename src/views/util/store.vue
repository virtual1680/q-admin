<template>
	<basic-container>
		<h3>存储</h3>
		<el-tag class="title">基本读写删(持久化存储)</el-tag>
		<div class="box">
			<el-button type="primary" @click="setItem({ name: 'username', value: 'avue' })">set('username', 'avue')</el-button>

			<el-button type="success" @click="getItem({ name: 'username' })">get('username')</el-button>

			<el-button type="danger" @click="delItem({ name: 'username' })">remove('username')</el-button>
		</div>
		<el-tag class="title">设置session(session存储)</el-tag>
		<div class="box">
			<el-button type="primary" @click="setItem({ name: 'username', value: 'avue', type: 'session' })">set('username', 'avue')</el-button>

			<el-button type="success" @click="getItem({ name: 'username', type: 'session' })">get('username')</el-button>

			<el-button type="danger" @click="delItem({ name: 'username', type: 'session' })">remove('username')</el-button>
		</div>
		<el-tag class="title">获取所有可以获得的数据</el-tag>
		<div class="box">
			<el-button type="success" @click="getAll()">getAll(持久化存储)</el-button>
			<el-button type="success" @click="getAll({ type: 'session' })">getAll(session存储)</el-button>
			<el-button type="danger" @click="clearAll()">delAll(持久化存储)</el-button>
			<el-button type="danger" @click="clearAll({ type: 'session' })">delAll(session存储)</el-button>
		</div>
	</basic-container>
</template>

<script lang="ts" setup name="store">
import { setStore, getStore, removeStore, clearStore, getAllStore } from 'utils/store';
import { ElMessage } from 'element-plus';

const setItem = (params: { name?: string; value?: string; type?: string }) => {
	const { name, value, type } = params;
	setStore({
		name: name,
		content: value,
		type: type
	});
	ElMessage.success(`设置数据 ${name} = ${value}`);
};
const getItem = (params: { name?: string; value?: string; type?: string }) => {
	const { name, type } = params;
	const content = getStore({
		name: name,
		type: type
	});
	ElMessage.success(`获取数据 ${name} = ${content}`);
};
const delItem = (params: { name?: string; value?: string; type?: string }) => {
	const { name, type } = params;
	removeStore({ name, type });
	ElMessage.success(`删除数据 ${name}`);
};
const clearAll = (params = {}) => {
	clearStore(params);
	ElMessage.success(`清除全部数据完成`);
};
const getAll = (params = {}) => {
	const list = getAllStore(params);
	console.log(list);
	ElMessage.success(`结果已经打印到控制台`);
};
</script>

<style lang="scss">
.title {
	margin-bottom: 10px;
}
.box {
	margin-bottom: 20px;
}
</style>
