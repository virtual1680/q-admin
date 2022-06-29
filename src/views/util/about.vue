<template>
	<basic-container>
		<h2>项目介绍</h2>
		<p style="line-height: 30px">
			Avue-cli基于 vue3 + vite + element plus + avue3 + vue-router + vuex，适配手机、平板、pc
			的后台开源免费模板，希望减少工作量，帮助大家实现快速开发。
		</p>
	</basic-container>
	<basic-container>
		<el-descriptions title="项目信息" :column="2" border>
			<el-descriptions-item>
				<template #label> 项目名称 </template>
				avue-cli
			</el-descriptions-item>
			<el-descriptions-item>
				<template #label> 版本 </template>
				3.x
			</el-descriptions-item>
			<el-descriptions-item>
				<template #label> 代码地址 </template>
				<a href="https://gitee.com/smallweigit/avue-cli" target="_blank">
					<el-tag>https://gitee.com/smallweigit/avue-cli</el-tag>
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

<script>
export default {
	data() {
		return {
			dependencies: {}
		};
	},
	created() {
		const modules = import.meta.glob('/**.json');
		modules['/package.json']().then(mode => {
			this.dependencies = mode.dependencies;
		});
	},
	computed: {
		list() {
			return Object.keys(this.dependencies);
		}
	}
};
</script>

<style lang="scss"></style>
