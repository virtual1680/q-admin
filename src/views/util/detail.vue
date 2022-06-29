<template>
	<basic-container>
		<h3 v-if="isEdit">{{ route.query.id ? '修改页面' : '新增页面' }}</h3>
		<template v-else>
			<h3>详情页</h3>
			<el-button type="primary" @click="handleGo()">新增页面</el-button>
			<el-button type="primary" @click="handleGo('1')">编辑页面</el-button>
		</template>
	</basic-container>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const index = ref('');
const isEdit = computed(() => {
	return route.path == '/detail/create';
});
const handleInit = () => {
	index.value = route.params.params as string;
};
const handleGo = (id?: string) => {
	router.push({ path: '/detail/create', query: { id } });
};
handleInit();
</script>

<style></style>
