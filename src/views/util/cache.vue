<template>
	<basic-container>
		<h3>这个页面会被 keep-alive</h3>
		<el-tag>在下面的输入框输入任意字符后，切换到其它页面，再回到此页时输入框文字保留，证明被缓存</el-tag>
		<br />
		<br />
		<el-input v-model="value" placeholder="input here"></el-input>

		<div style="height: 1000px"></div>
	</basic-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('');
</script>
