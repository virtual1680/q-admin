<template>
	<basic-container>
		<h3>请打开浏览器控制台，然后点击下面的按钮</h3>
		<el-button type="danger" @click="handleNewError">触发一个错误</el-button>
	</basic-container>
</template>

<script lang="ts" setup>
const handleNewError = () => {
	console.log(new Error('a is not defined'));
};
</script>
