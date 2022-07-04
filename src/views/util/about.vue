<template>
	<basic-container>
		<h2>项目介绍</h2>
		<p style="line-height: 30px">目前项目正常运行，还有些问题有待尝试</p>
	</basic-container>
	<basic-container>
		<el-descriptions title="项目信息" :column="2" border>
			<el-descriptions-item>
				<template #label> 项目名称 </template>
				q-admin
			</el-descriptions-item>
			<el-descriptions-item>
				<template #label> 版本 </template>
				3.x
			</el-descriptions-item>
			<el-descriptions-item>
				<template #label> 代码地址 </template>
				<a href="https://github.com/virtual1680/q-admin" target="_blank">
					<el-tag>https://github.com/virtual1680/q-admin</el-tag>
				</a>
			</el-descriptions-item>
			<el-descriptions-item>
				<template #label> 预览地址 </template>
				<a href="https://cli.avuejs.com" target="_blank">
					<el-tag>https://cli.avuejs.com</el-tag>
				</a>
			</el-descriptions-item>
		</el-descriptions>
	</basic-container>
	<basic-container>
		<el-descriptions title="项目依赖" :column="2" border>
			<el-descriptions-item v-for="(item, index) in list" :key="index">
				<template #label>
					{{ item }}
				</template>
				{{ dependencies[item] }}
			</el-descriptions-item>
		</el-descriptions>
	</basic-container>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

let dependencies = ref({});
const modules = import.meta.glob('/**.json');
modules['/package.json']().then(mode => {
	dependencies.value = mode.dependencies;
});
const list = computed(() => {
	return Object.keys(dependencies.value);
});
</script>

<style lang="scss"></style>
