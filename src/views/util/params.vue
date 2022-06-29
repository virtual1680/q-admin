<template>
	<basic-container>
		<h3>{{ index ? index : '参数' }}</h3>
		<el-button type="primary" @click="handleGo(1)">参数1页面</el-button>
		<el-button type="primary" @click="handleGo(2)">参数2页面</el-button>
	</basic-container>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const index = ref('');

const handleInit = () => {
	index.value = route.params.params as string;
};
const handleGo = (index: number) => {
	router.push({ path: '/query/' + index, query: { name: '参数' + index } });
};
watch(
	() => route.query,
	() => {
		handleInit();
	}
);

handleInit();
</script>

<style></style>
