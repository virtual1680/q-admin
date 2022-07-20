<template>
	<basic-container>
		<h3>标签</h3>
		<el-button type="primary" @click="router.push('/query/1')">打开一个页面</el-button>
		<el-button type="primary" @click="router.qvRouter?.closeTag('/query/1')">关闭打开的页面</el-button>
		<el-button type="primary" @click="router.push('/tabs/index')">打开一个页面(不在标签里)</el-button>
		<el-button type="primary" @click="router.qvRouter?.closeTag()">关闭本标签</el-button>
	</basic-container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { AVueRouter } from 'router/index';

const router = useRouter() as AVueRouter;
</script>

<style></style>
